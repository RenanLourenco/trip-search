import { PartialType } from "@nestjs/mapped-types";
import { CreateDestinationDTO } from "./CreateDestination.dto";

export class UpdateDestinationDTO extends PartialType(CreateDestinationDTO){}