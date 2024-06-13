import { Global, Module } from "@nestjs/common";
import { userRepositoryProvider } from "@utils/providers";

@Global()
@Module({
    providers: [
        ...userRepositoryProvider
    ],
    exports: [
        ...userRepositoryProvider
    ]
})
class RepositoryModule {}

export { RepositoryModule };
