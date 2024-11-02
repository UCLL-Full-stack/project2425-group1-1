import { Product } from '../../model/product';

test('given: valid values for product, when: product is created, then: product is created with those values', () => {
    // given
    const productData = {
        id: 1,
        name: 'New Product',
        description: 'This is a description of the new product.',
        releaseDate: new Date('2023-10-01'),
    };

    // when
    const product = new Product(productData);

    // then
    expect(product.getId()).toEqual(productData.id);
    expect(product.getName()).toEqual(productData.name);
    expect(product.getDescription()).toEqual(productData.description);
    expect(product.getReleaseDate()).toEqual(productData.releaseDate);
});

test('given: missing name, when: product is created, then: an error is thrown', () => {
    // given
    const productData = {
        name: '',
        description: 'Product without a name',
        releaseDate: new Date('2023-10-01'),
    };

    // when
    const createProduct = () => new Product(productData);

    // then
    expect(createProduct).toThrow('Product name is required');
});

test('given: missing description, when: product is created, then: an error is thrown', () => {
    // given
    const productData = {
        name: 'Unnamed Product',
        description: '',
        releaseDate: new Date('2023-10-01'),
    };

    // when
    const createProduct = () => new Product(productData);

    // then
    expect(createProduct).toThrow('Description is required');
});
