import ListProductUseCase from "./list.product.usecase";

const product1 =
{
    id: "1",
    name: "Product 1",
    price: 10
};

const product2 =
{
    id: "2",
    name: "Product 2",
    price: 20
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    }
}

describe("Unit test for listing product use case", () => {
    it("should list a product", async () => {
        const productRepository = MockRepository();
        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe("1");
        expect(output.products[0].name).toBe("Product 1");
        expect(output.products[0].price).toBe(10);
        expect(output.products[1].id).toBe("2");
        expect(output.products[1].name).toBe("Product 2");
        expect(output.products[1].price).toBe(20);


    })
});
