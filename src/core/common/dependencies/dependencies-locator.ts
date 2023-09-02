import { AuthClerkRepository } from "@/core/auth/infraestructure";
import {
  GetStoreByUserIdUseCase,
  GetStoreUseCase,
  SaveStoreUseCase,
} from "@/core/store/domain/usecases";
import { StorePloc } from "@/core/store/presentation";
import { StorePrismaRepository } from "@/core/store/infraestructure";

function storePloc(): StorePloc {
  const authRepository = new AuthClerkRepository();
  const storeRepository = new StorePrismaRepository();
  const getStoreByUserIdUseCase = new GetStoreByUserIdUseCase(
    authRepository,
    storeRepository
  );
  const getStoreUseCase = new GetStoreUseCase(authRepository, storeRepository);
  const saveStoreUseCase = new SaveStoreUseCase(
    authRepository,
    storeRepository
  );

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
