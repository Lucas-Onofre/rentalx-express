interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  execute({ name, description }: IRequest): void {
    console.log(name, description);
  }
}

export { CreateSpecificationService };
