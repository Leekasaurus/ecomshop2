import Home from './Home';


function CategoryItem(category) {
  return (
    <div className="button">
      <h2>category.title</h2>
      <img src={category.imageurl} />
    </div>
  );
}


export default CategoryItem;
