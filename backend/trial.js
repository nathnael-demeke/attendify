var list1 = [1,2,3,4]
var list2 = [1,4]

for (var index in list1) {
    var item = list1[index]
    if (list2.includes(item)) {
        list1.splice(index,1) 
    }
}
console.log(list1)