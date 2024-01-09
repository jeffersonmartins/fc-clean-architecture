import { Product } from "../../../usecase/product/list/list.product.dto";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<Product> {
        return new ProductYupValidator();
    }
}