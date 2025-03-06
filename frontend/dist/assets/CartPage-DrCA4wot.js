import{j as e,r as o,b as F,F as O,f as M,c as R,k as i}from"./index-CkEZBD4C.js";import{c as A,a as j}from"./utils-uYTjRYPR.js";import{I as N,B as P}from"./button-wD2nja-z.js";const Y=({isOpen:t,onClose:n,children:c})=>t?e.jsx("div",{className:"text-black fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center",children:e.jsxs("div",{className:"bg-gray-100 dark:bg-zinc-900 text-black dark:text-white w-4/5 p-6 rounded shadow-lg relative",children:[e.jsx("button",{onClick:n,className:"absolute top-2 right-2 text-gray-600 text-5xl",children:"×"}),c]})}):null,v=o.forwardRef(({className:t,...n},c)=>e.jsx("textarea",{className:A("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",t),ref:c,...n}));v.displayName="Textarea";const $=()=>{const{state:t,dispatch:n}=F(),[c,u]=o.useState(!1),f=localStorage.getItem("details"),m=f?JSON.parse(f):{name:"",address:"",phone:""},[r,w]=o.useState({name:m.name,address:m.address,phone:m.phone}),[d,k]=o.useState({name:"",address:"",phone:""}),[b,g]=o.useState(!1),[h,C]=o.useState({});o.useEffect(()=>{const s=async()=>{const a={};for(const l of t.items)try{const p=await j.get(`/api/v1/market/prices/${l.name}`);a[l.name]=p.data.price}catch(p){console.error(`Error fetching price for ${l.name}:`,p),a[l.name]=l.price}C(a)};t.items.length>0&&s()},[t.items]);const E=s=>{n({type:"INCREMENT_QUANTITY",payload:{name:s,quantity:0,image:"",price:0}})},S=s=>{n({type:"DECREMENT_QUANTITY",payload:{name:s,quantity:0,image:"",price:0}})},T=s=>{n({type:"REMOVE_ITEM",payload:{name:s,quantity:0,image:"",price:0}})},y=()=>t.items.reduce((s,a)=>s+a.quantity*(h[a.name]||a.price),0),q=()=>{t.items.length>0?u(!0):i.error("Your cart is empty")},x=s=>{w({...r,[s.target.name]:s.target.value})},I=()=>{const s={name:"",address:"",phone:""};let a=!0;return r.name||(s.name="Name is required",a=!1),r.phone?/^\d{10}$/.test(r.phone)||(s.phone="Phone must be 10 digits",a=!1):(s.phone="Phone is required",a=!1),r.address||(s.address="Address is required",a=!1),k(s),a},D=async()=>{if(!I())return;g(!0);const s={name:r.name,quantity:t.items.reduce((a,l)=>a+l.quantity,0),address:r.address,phone:r.phone,items:t.items.map(a=>({...a,price:h[a.name]||a.price}))};try{(await j.post("https://butcher-jtol.onrender.com/api/v1/order/create",s)).data.success?(i.success("Order created successfully"),n({type:"CLEAR_CART",payload:{name:"",quantity:0,image:"",price:0}}),window.location.href="/"):i.error("Failed to create order"),localStorage.setItem("details",JSON.stringify({name:s.name,address:s.address,phone:s.phone}))}catch(a){console.error("Error creating order:",a),i.error("Error creating order")}finally{g(!1)}};return e.jsx("div",{className:"bg-gray-200 dark:bg-zinc-800 text-black dark:text-white min-h-screen",children:e.jsxs("div",{className:"container mx-auto p-4 pb-24",children:[e.jsxs("div",{className:"flex flex-col md:flex-row gap-8",children:[e.jsxs("div",{className:"md:w-2/3",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Shopping Cart"}),e.jsx("div",{className:"cart-items",children:t.items.length===0?e.jsx("p",{children:"Your cart is empty"}):t.items.map(s=>e.jsxs("div",{className:"flex items-center justify-between border-b border-black dark:border-white py-4",children:[e.jsx("img",{src:s.image,alt:s.name,className:"w-24 h-24 object-cover rounded-lg"}),e.jsxs("div",{className:"flex-1 ml-4",children:[e.jsx("h3",{className:"text-lg font-semibold",children:s.name}),e.jsxs("div",{className:"flex items-center mt-2",children:[e.jsx("button",{onClick:()=>S(s.name),className:"bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800 font-bold py-1 text-2xl px-4 rounded-full",children:"-"}),e.jsxs("span",{className:"mx-4",children:[s.quantity,"kg"]}),e.jsx("button",{onClick:()=>E(s.name),className:"bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800 font-bold py-1 text-2xl px-4 rounded-full",children:"+"}),e.jsx("button",{onClick:()=>T(s.name),className:"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4",children:e.jsx(O,{icon:M})})]}),e.jsxs("p",{className:"ml-auto text-lg mt-2 font-semibold",children:["₹",(s.quantity*(h[s.name]||s.price)).toFixed(2)]})]})]},s.name))})]}),e.jsx("div",{className:"md:w-1/3",children:e.jsxs("div",{className:"bg-gray-100 dark:bg-zinc-700 text-black dark:text-white p-6 rounded-lg shadow-lg",children:[e.jsx("h3",{className:"text-xl font-bold mb-4",children:"Order Summary"}),e.jsxs("div",{className:"flex justify-between mb-4",children:[e.jsx("span",{children:"Subtotal:"}),e.jsxs("span",{children:["₹",y().toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between mb-4",children:[e.jsx("span",{children:"Delivery Charges:"}),e.jsx("span",{children:"15RS per kilometers(km) from chtrapati chowk,nanded to delivery location"})]}),e.jsx("hr",{className:"border-gray-300 dark:border-zinc-600"}),e.jsxs("div",{className:"flex justify-between mt-4",children:[e.jsx("span",{className:"text-lg font-bold",children:"Total:"}),e.jsxs("span",{className:"text-2xl font-bold",children:["₹",y().toFixed(2)]})]}),e.jsx("button",{onClick:q,className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full mt-4",disabled:b,children:b?e.jsx(R,{}):"Order Now"})]})})]}),e.jsxs(Y,{isOpen:c,onClose:()=>u(!1),children:[e.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Enter Your Details"}),e.jsxs("form",{className:"flex flex-col gap-4",children:[e.jsx(N,{name:"name",value:r.name,onChange:x,placeholder:"Name"}),d.name&&e.jsx("p",{className:"text-red-500",children:d.name}),e.jsx(N,{name:"phone",value:r.phone,onChange:x,placeholder:"Phone"}),d.phone&&e.jsx("p",{className:"text-red-500",children:d.phone}),e.jsx(v,{name:"address",value:r.address,onChange:x,placeholder:"Address"}),d.address&&e.jsx("p",{className:"text-red-500",children:d.address}),e.jsx(P,{type:"button",onClick:D,className:"w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded",children:"Submit"})]})]})]})})};export{$ as default};
