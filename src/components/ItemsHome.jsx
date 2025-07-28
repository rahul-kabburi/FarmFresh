import React, { useEffect, useState } from 'react'
import { itemsHomeStyles } from '../assets/dummyStyles'
import BannerHome from './BannerHome'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../pages/CartContext'
import { FaChevronRight, FaMinus, FaPlus, FaShoppingCart, FaThList } from 'react-icons/fa'
import { categories, products } from '../assets/dummyData'

const ItemsHome = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCatrgory] = useState(() => {
    return localStorage.getItem('activeCategory') || 'All'
  })
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    localStorage.setItem('activeCategory', activeCategory)
  }, [activeCategory])

  //Search Features
  const productMatchesSearch = (product, term) => {
    if(!term) return true
    const cleanTerm = term.trim().toLowerCase()
    const searchedWords = cleanTerm.split(/\s+/)
    return searchedWords.every(word => product.name.toLowerCase().includes(word))
  }
  //Search across all products / logic to show if no products found(if all products to show or if category pre selected show the acrive category)
  const searchedProducts = searchTerm ? products.filter(product => productMatchesSearch(product, searchTerm)) : (activeCategory === "All" ? products : products.filter((product)=>product.category === activeCategory))

  //Get cart quantity
  const getQuantity = (productId) => {
    const item = cart.find((ci) => ci.id === productId)
    return item ? item.quantity : 0
  }

  //handling increase or decrease of cart items and their quantities
  const handleIncrease = (product) => addToCart(product, 1)
  const handleDecrease = (product) => {
    const qty = getQuantity(product.id)
    if(qty > 1) updateQuantity(product.id, qty - 1)
      else removeFromCart(product.id)
  }

  //redirect to items
  const redirectToItemsPage = () => {
    navigate('/items', { state: {category: activeCategory}})
  } 

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  //create a sidebar category
  const sidebarCategories = [
    {
      name: "All Items",
      icon: <FaThList className=' text-lg' />,
      value: "All"
    },
    ...categories
  ]
  return (
    <div className={itemsHomeStyles.page}>
      <BannerHome onSearch={handleSearch} />
      <div className=' flex flex-col lg:flex-row flex-1'>
        <aside className={itemsHomeStyles.sidebar}>
          <div className={itemsHomeStyles.sidebarHeader}>
            <h1 style={{ fontFamily: "'playfair Display', serif", textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }} className={itemsHomeStyles.sidebarTitle}>Fresh Cart</h1>
          </div>
          <div className={itemsHomeStyles.sidebarDivider} />
          <div className={itemsHomeStyles.categoryList}>
            <ul className=' space-y-3'>
              {sidebarCategories.map((category) => (
                <li key={category.name}>
                  <button onClick={() => {
                    setActiveCatrgory(category.value || category.name)
                    setSearchTerm('')
                  }} className={`${itemsHomeStyles.categoryItem} ${(activeCategory === (category.value || category.name)) && !searchTerm ? itemsHomeStyles.activeCategory : itemsHomeStyles.inactiveCategory}`}>
                    <div className={itemsHomeStyles.categoryIcon}>{category.icon}</div>
                    <span className={itemsHomeStyles.categoryName}>{category.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/** main content */}
        <main className={itemsHomeStyles.mainContent}>
          {/**mobile category scroll => This snippet is specifically for mobile devices */}
          <div className={itemsHomeStyles.mobileCategories}>
            <div className=' flex space-x-4'>
              {sidebarCategories.map((cat) => (
                <button key={cat.name} onClick={() => {
                  setActiveCatrgory(cat.value || cat.name)
                  setSearchTerm('')
                }} className={`${itemsHomeStyles.mobileCategoryItem} ${activeCategory === (cat.value || cat.name) && !searchTerm ? itemsHomeStyles.activeMobileCategory : itemsHomeStyles.inactiveMobileCategory}`}>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          {/** search result */}
          {searchTerm && (
            <div className={itemsHomeStyles.searchResults}>
              <div className=' flex items-center justify-center'>
                <span className=' text-emerald-700 font-medium'>
                  Search Results for: <span className=' font-bold'>"{searchTerm}"</span>
                </span>
                <button onClick={() => setSearchTerm('')} className=' ml-4 text-emerald-500 hover: text-shadow-emerald-700 p-1 rounded-full transition-colors'>
                  <span className=' text-sm bg-emerald-100 px-2 py-1 rounded-full'>Clear</span>
                </button>
              </div>
            </div>
          )}
          {/** search section Title */}
          <div className=' text-center mb-6'>
            <h2 className={itemsHomeStyles.sectionTitle}>
              {searchTerm ? "search Results" : (activeCategory === "All" ? 'All Products' : `Farm Fresh ${activeCategory}`)}
            </h2>
            <div className={itemsHomeStyles.sectionDivider} />
          </div>
          {/** Products Grid */}
          <div className={itemsHomeStyles.productsGrid}>
            {searchedProducts.length > 0 ? (
              searchedProducts.map((product) => {
                const qty = getQuantity(product.id)
                return(
                  <div key={product.id} className={itemsHomeStyles.productCard}>
                    <div className={itemsHomeStyles.imageContainer}>
                      <img src={product.image} alt={product.name} className={itemsHomeStyles.productImage} onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentNode.innerHTML = `
                        <div class= ' flex items-center justify-center w-full h-full bg-gray-200'>
                        <span class= ' text-gray-500 text-sm'>No Image</span></div>`
                      }} />
                    </div>
                    <div className={itemsHomeStyles.productContent}>
                      <h3 className={itemsHomeStyles.productTitle}>{product.name}</h3>
                      <div className={itemsHomeStyles.priceContainer}>
                        <div>
                          <p className={itemsHomeStyles.currentPrice}>{product.price.toFixed(2)}</p>
                          <span className={itemsHomeStyles.oldPrice}>{(product.price * 1.2).toFixed(2)}</span>
                        </div>
                        {/**Add controls */}
                        {qty === 0 ? (
                          <button onClick={() => handleIncrease(product)} className={itemsHomeStyles.addButton}>
                            <FaShoppingCart className=' mr-2'/>
                            Add
                          </button>
                        ) : (
                          <div className={itemsHomeStyles.quantityControls}>
                            <button onClick={() => handleDecrease(product)} className={itemsHomeStyles.quantityButton}>
                              <FaMinus/>
                            </button>
                            <span className=' font-bold'>{qty}</span>
                            <button onClick={()=> handleIncrease(product)} className={itemsHomeStyles.quantityButton}>
                              <FaPlus/>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className={itemsHomeStyles.noProducts}>
                <div className={itemsHomeStyles.noProductsText}>
                  No products found
                </div>
                <button onClick={() => setSearchTerm('')} className={itemsHomeStyles.clearSearchButton}>
                  Clear Search
                </button>
              </div>
            )}
          </div>
          {/**View All Button */}
          {!searchTerm && (
            <div className=' text-center'>
              <button onClick={redirectToItemsPage} className={itemsHomeStyles.viewAllButton}>View All {activeCategory === "All" ? 'products' : activeCategory} <FaChevronRight className=' ml-3'/></button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ItemsHome
