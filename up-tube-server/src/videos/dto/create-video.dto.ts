//import { isString, IsNotEmpty } from "class-validator";

export class CreateVideoDto {
    id?: number;

    //@IsNotEmpty()
    title: string;

    //@IsNotEmpty()
    description: string;

   // @IsNotEmpty()
    videoBlob: Blob;

    //thumbnail: Blob;
}
