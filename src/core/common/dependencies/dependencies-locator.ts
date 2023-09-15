import {
  GetAllStoresByUserIdUseCase,
  GetStoreByUserIdUseCase,
  GetStoreUseCase,
  SaveStoreUseCase,
} from "@/core/store/domain/usecases";
import { StorePloc, StoreModalPloc } from "@/core/store/presentation";
import { StorePrismaRepository } from "@/core/store/infraestructure";

function storePloc(): StorePloc {
  const storeRepository = new StorePrismaRepository();
  const getAllStoresByUserIdUseCase = new GetAllStoresByUserIdUseCase(
    storeRepository
  );
  const getStoreByUserIdUseCase = new GetStoreByUserIdUseCase(storeRepository);
  const getStoreUseCase = new GetStoreUseCase(storeRepository);
  const saveStoreUseCase = new SaveStoreUseCase(storeRepository);

  const storePloc = new StorePloc(
    getAllStoresByUserIdUseCase,
    getStoreByUserIdUseCase,
    getStoreUseCase,
    saveStoreUseCase
  );

  return storePloc;
}

function storeModalPloc(): StoreModalPloc {
  const storeModalPloc = new StoreModalPloc();
  return storeModalPloc;
}

export const dependenciesLocator = {
  storePloc,
  storeModalPloc,
};
