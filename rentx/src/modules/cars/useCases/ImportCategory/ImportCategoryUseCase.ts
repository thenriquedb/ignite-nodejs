import { parse as csvParser } from "csv-parse";
import fs from "fs";
import { finished } from "stream/promises";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async loadCategories(file: Express.Multer.File) {
    const parser = fs.createReadStream(file.path).pipe(csvParser());
    const categories: IImportCategory[] = [];

    parser.on("data", async (line: [string, string]) => {
      const [name, description] = line;
      categories.push({ name, description });
    });

    await finished(parser);
    await fs.promises.unlink(file.path);

    return categories;
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);

    // eslint-disable-next-line no-restricted-syntax
    for await (const category of categories) {
      const { name, description } = category;
      const categoryExists = await this.categoriesRepository.findByName(name);

      if (!categoryExists) {
        await this.categoriesRepository.create({ name, description });
      }
    }
  }
}

export { ImportCategoryUseCase };
