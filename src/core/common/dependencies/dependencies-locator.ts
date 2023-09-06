import {
  GetStoreByUserIdUseCase,
  GetStoreUseCase,
  SaveStoreUseCase,
} from "@/core/store/domain/usecases";
import { StorePloc } from "@/core/store/presentation";
import { StorePrismaRepository } from "@/core/store/infraestructure";

function storePloc(): StorePloc {
  const storeRepository = new StorePrismaRepository();
  const getStoreByUserIdUseCase = new GetStoreByUserIdUseCase(storeRepository);
  const getStoreUseCase = new GetStoreUseCase(storeRepository);
  const saveStoreUseCase = new SaveStoreUseCase(storeRepository);

  const storePloc = new StorePloc(
    getStoreByUserIdUseCase,
    getStoreUseCase,
    saveStoreUseCase
  );

  return storePloc;
}

export const dependenciesLocator = {
  storePloc,
};
