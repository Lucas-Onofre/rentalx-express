interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  execute({ name, description }: IRequest): void {
    console.log();
  }
}

export { CreateSpecificationService };
