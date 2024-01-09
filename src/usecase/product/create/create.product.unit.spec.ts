import CreateProductUseCase from "./create.product.usecase"

const input = {
    id: "123",
    name: "Product 1",
    price: 10 
}
const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        input.name = "";
        await expect(createProductUseCase.execute(input))
            .rejects.toThrow("Name is required")
    })

    it("should thrown an error when price is less than zero", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        input.name = "Product 1";
        input.price = -1;
        await expect(createProductUseCase.execute(input))
            .rejects.toThrow("product: Price must be greater than zero")
    })

    it("should change name", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        input.name = "Product 1";
        input.price = 10;
        const output = await createProductUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
        input.name = "Product 2";
        const output2 = await createProductUseCase.execute(input);
        expect(output2).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    
    })

    it("should change price", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        input.price = 10
        const output = await createProductUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
        input.price = 20;
        const output2 = await createProductUseCase.execute(input);
        expect(output2).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })
    

})