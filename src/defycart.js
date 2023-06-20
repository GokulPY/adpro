import React, { useState, useEffect } from 'react';
import './defycart.css';

const categories = ['watches', 'cooldrinks', 'headphones'];

const products = [
  {
    id: 1,
    name: 'Bovonto',
    code: '0110',
    category: 'cooldrinks',
    image: './pics/bovonto.jpg',
    description: 'A popular carbonated beverage from India, known for its unique taste and regional popularity.',
  },
  {
    id: 2,
    name: 'Beats Headphone Cs3',
    code: '0252',
    category: 'Headphones',
    image: './pics/beats.jpeg',
    description: 'Beats Headphone Cs3: High-quality headphones with a crisp sound and stylish design.',
  },
  {
    id: 3,
    name: 'Titan Watch 1998',
    code: '4403',
    category: 'Watches',
    image: './pics/titan.jpg',
    description: 'A timeless timepiece with a classic design, impeccable craftsmanship, and superior functionality.',
  },
  {
    id: 4,
    name: 'Fanta 1L',
    code: '8804',
    category: 'cooldrinks',
    image: './pics/fanta.jpg',
    description: 'A vibrant and fruity carbonated drink by Coca-Cola with a range of refreshing flavors.',
  },
  {
    id: 5,
    name: 'Jbl Headphone 220',
    code: '8505',
    category: 'Headphones',
    image: './pics/jbl.jpg',
    description: ' Immerse yourself in superior sound quality and enjoy the ultimate audio experience.',
  },
  {
    id: 6,
    name: 'Bolt Watch D2',
    code: '1205',
    category: 'watches',
    image: './pics/bolt.jpg',
    description: 'A stylish and reliable timepiece that combines functionality with a touch of elegance.',
  },
  {
    id: 7,
    name: 'Coca Cola 2L',
    code: '2304',
    category: 'cooldrinks',
    image: './pics/cocacola.jpg',
    description: 'A vibrant and fruity carbonated drink by Coca-Cola with a range of refreshing flavors.',
  },
  {
    id: 8,
    name: 'Bose Headphone 9B',
    code: '8206',
    category: 'headphones',
    image: './pics/bose.jpg',
    description: 'Immerse yourself in high-quality sound with these stylish and comfortable headphones from Boat.',
  },
  {
    id: 9,
    name: 'Techno Watch ultra',
    code: '8208',
    category: 'watches',
    image: './pics/tecno.jpg',
    description: 'Stay connected and stylish with this feature-packed smartwatch from Techno.',
  },
]

const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showModel, setShowModel] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    code: '',
    category: '',
    image: null,
    description: '',
  });

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle category selection change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    setShowModel(true);
  };

  // Handle model close
  const handleCloseModel = () => {
    setShowModel(false);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Add the new product to the list
    const newProductId = filteredProducts.length + 1;
    const newProductWithId = { ...newProduct, id: newProductId };
    setFilteredProducts([...filteredProducts, newProductWithId]);

    // Reset the new product state
    setNewProduct({
      name: '',
      code: '',
      category: '',
      image: null,
      description: '',
    });

    setShowModel(false);
  };

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <h1 className="Header">DefyCart</h1>

      <div>
        <input
          className="sbox"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search By Product Name"
        />
        <select
          className="cselect"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button className="Addbtn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      {showModel && (
        <div className="model">
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
            </label>

            <label>
              Code:
              <input
                type="text"
                value={newProduct.code}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, code: e.target.value })
                }
                required
              />
            </label>

            <label>
              Category:
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Image:
              <input
                type="file"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: URL.createObjectURL(e.target.files[0]) })
                }
                required
              />
            </label>

            <label>
              Description:
              <textarea
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </label>

            <button type="submit">Submit</button>
            <button type="button" onClick={handleCloseModel}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
          {product.image && (
            <img src={product.image} alt={product.name} />
          )}
          <h2>{product.name}</h2>
          <p>Code: {product.code}</p>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductListPage;
