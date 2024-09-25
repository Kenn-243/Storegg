
import { HomeParams } from "../home/Home"
import { DescParams } from "../home/Desc"
import { MinigameParams } from "../home/Minigame"
import { mMyProductsParams } from "../home/MyProduct"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
    Home: HomeParams;
    Desc: DescParams;
    Minigame: MinigameParams;
    MyProducts: mMyProductsParams;
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

declare global {
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamList {}
    }
}