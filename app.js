var Hanzo=require("./hanzo")

var state={
    key:"value"
}

var app=new Hanzo(state)

app.appendState({
    test:true
})

var foo=function(){
    console.log("hello")
}

app.setAction({"hello":foo})

app.appendAction("bye",foo)

app._activation("stateChange")
console.log(app)