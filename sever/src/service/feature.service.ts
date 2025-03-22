import { AppDataSource } from "../config/data-source";
import { Feature } from "../models/feature.entity";

export class FeatureService {
  private featureRepository = AppDataSource.getRepository(Feature);

  async getAllFeatures(): Promise<Feature[]> {
    //const request = await req;
    return this.featureRepository.find();
  }
}
