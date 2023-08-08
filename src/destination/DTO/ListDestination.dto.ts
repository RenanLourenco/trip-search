export class ListDestinationDTO {
    constructor(
        readonly id: string,
        readonly meta: string,
        readonly name: string,
        readonly photo_one:string,
        readonly photo_two:string,
        readonly description?:string,
    ) {}
  }