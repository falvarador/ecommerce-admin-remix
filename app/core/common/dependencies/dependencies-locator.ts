import {
  GetAllStoresByUserIdUseCase,
  GetStoreByUserIdUseCase,
  GetStoreUseCase,
  SaveStoreUseCase,
} from "@/core/store/domain/usecases";
import { StoreService } from "@/core/store/presentation";
import { StorePrismaRepository } from "@/core/store/infraestructure";

function storeService(): StoreService {
  const storeRepository = new StorePrismaRepository();
  const getAllStoresByUserIdUseCase = new GetAllStoresByUserIdUseCase(
    storeRepository
  );
  const getStoreByUserIdUseCase = new GetStoreByUserIdUseCase(storeRepository);
  const getStoreUseCase = new GetStoreUseCase(storeRepository);
  const saveStoreUseCase = new SaveStoreUseCase(storeRepository);

  const storeService = new StoreService(
    getAllStoresByUserIdUseCase,
    getStoreByUserIdUseCase,
    getStoreUseCase,
    saveStoreUseCase
  );

  return storeService;
}

export const dependenciesLocator = {
  storeService,
};
