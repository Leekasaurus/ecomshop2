import CategoryItem from './CategoryItem';


function Directory({categories}) {
  return (
    <div>
    {categories.map({category} => (
    <CategoryItem key={category.id} category={category} />
    ))},
    </div>
  );
}

export default Directory;