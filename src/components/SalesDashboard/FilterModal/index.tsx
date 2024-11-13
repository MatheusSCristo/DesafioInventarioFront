
const FilterModal = ({closeModal}:{closeModal:()=>void}) => {
  return (
    <div className=" flex flex-col gap-5 ">
      <div>
        <span>De:</span>
        <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
      <div>
        <span>Até:</span>
        <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
      <button className="btn btn-success" onClick={()=>{
        closeModal()
      }}>Filtrar</button>
    </div>
  )
}

export default FilterModal