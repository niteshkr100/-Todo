
import { useEffect, useState} from "react";
// any name can be given to image after importing
import notesimg from  "../Assets/todo.jpeg"
import './Todo.css'
 
//this getLocalStorage works only only time when we open the site as inside UseState() bracket we put thing for initial state set in Items. After that setItem is change the state
const getLocalStorage = () =>{
  let list = localStorage.getItem("lists");
   console.log(list)//string form of orginal value

  // if item in list exist then get data from local storage and convet it into array object (original form) 
  if(list){
    return JSON.parse(localStorage.getItem("lists"));
  }
  else{
    return [];
  }
}

function Todo() {

    //this state store user input data on changing input field
  const [inputData, setInputData] = useState("");

  //this state store list of item in array
  // const [items, setItems] = useState([]);
  const [items, setItems] = useState(getLocalStorage());
  const [toggleAddBtn, setToggleAddBtn] = useState(true);
  const [currentItemId, setCurrentItemId] = useState(null);


  const addItem = () =>{
    // step1------------
     //inputData is inside this [] array bracket to insert inputData inside array if this is not done then only string is inserted by replacimg the empty aray [] and we string as output 
    //------------->  setItems([inputData]);  //unable to storee previous data
    // step2------------
    // ...dot is used with array items to store previous state data if this ... three dot is not used then we cannot store previous data only get new data in array, all previous is remove
    // ...items represented all previous data in array
    // after comma(,) inputData is new enter data to be add to items array.
    // -------------> setItems([...items, inputData]);
    if(!inputData){
         //we nothing is present in the input field and we click on + then do nothing means do not add 
    }
    else if(inputData && !toggleAddBtn){ //if something write in input field and toggle is false means update btn
      setItems(
           items.map((item)=>{
               if(item.id === currentItemId){
                 return{...item, data:inputData}
               }
               return item 
           })
        )
       // reset the things
        setInputData("");
        setToggleAddBtn(true)
        setCurrentItemId(null)
    }
    else{
        // const allInput = [{id:new Date().getTime().toString(), data:inputData}]
        const allInput = {id:new Date().getTime().toString(), data:inputData} 
        // if this is used then do not need to use [0] with item as sub array is not form only object is saved in on e array

        // if present inside input field add to item array
        setItems([...items,  allInput]);

        //this is used to clear input field after clicking add button that is setInput state blank("")
        setInputData("")
    }
  }
      // delete item on click
       const deleteItem = (ind) => {
        const update = items.filter((item)=>{
          // return ind !== item[0].id;
          return ind !== item.id;
        })
        setItems(update)
       }

      //delete all button
      const deleteAll=()=>{
        setItems([])
      }
      //Add data to local storage(for avoiding the memory loss in refresh)
         // localStorage take key--value pairs
         // key(name)--- value pair
         // lists(name-->anything)  and items(value)
         // items is an array, localStorage takes only string so, we convert array object in string form
       useEffect(()=>{
         console.log(items)//original form
         localStorage.setItem('lists', JSON.stringify(items))
       },[items])


       //edit 
       const editItem = (ind) =>{
        const editData = items.find((item)=>{
          // return item[0].id === ind;
          return item.id === ind;
        })
        console.log(editData.id);
        // console.log(editData[0].id);
        console.log(editData.data);
        // console.log(editData[0].data);
        // setInputData(editData);
        setInputData(editData.data);
        setToggleAddBtn(false)
        setCurrentItemId(editData.id)
       }
  return (
    <>
        <div className="mainContainer">
            <div className="container">
                  <img src={notesimg} alt="" className='imgLogo'/>
                  <br />
                  <span className="title">Add your List here ✌️</span>
                  <br />
                  <div className="inputNote">

                   <input type="text" placeholder="✍🏻 Add items" value={inputData} onChange={ (e)=>setInputData(e.target.value)}/>
                  
                  {
                    toggleAddBtn?
                   <i class="fa-solid fa-plus mleft" onClick={addItem}></i>:
                   <span class="material-symbols-outlined mleft" onClick={addItem}>published_with_changes</span>
                  }
                    

                 </div>
                 {/* add Item in UI form with html css using map method */}
                 <div className="content">
                 {/* this is inside return that is jsx field where we can used javascript inside html */}
                  {
                   items.map((item)=>{
                  return(
                    <div className="addItem" key={item.id}>
                    <span><h3>{item.data}</h3></span>
                    <span>
                    <span class="material-symbols-outlined edit" onClick={()=> editItem(item.id)} >edit</span>
                    <span class="material-symbols-outlined trash" title="Delete item"  onClick={()=> deleteItem(item.id)}>delete</span>
                    </span>
                        </div>
                         )
                            })
                     }
                 </div>
                  <button className="btn" onClick={deleteAll}>Remove All</button>
            </div>
        </div>
    </>
  );
}

export default Todo;
