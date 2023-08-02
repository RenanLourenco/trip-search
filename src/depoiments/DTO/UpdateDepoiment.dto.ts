import { PartialType } from "@nestjs/mapped-types";
import { CreateDepoimentDTO } from "./CreateDepoiment.dto";

export class UpdateDepoimentDTO extends PartialType(CreateDepoimentDTO){}