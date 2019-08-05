// const { SyncHook } = require('tapable');
// const mySyncHook = new SyncHook(['name', 'age']);
// // 为什么叫tap水龙头 接收两个参数，
// // 第一个参数是名称（备注：没有任何意义）  第二个参数是一个函数 接收一个参数  name这个name和上面的name对应 age和上面的age对应
// mySyncHook.tap('1', function (name, age) {
//     console.log(name, age, 1)
//     return 'wrong' // 不关心返回值 这里写返回值对结果没有任何影响
// });

// mySyncHook.tap('2', function (name, age) {
//     console.log(name, age, 2)
// });

// mySyncHook.tap('3', function (name, age) {
//     console.log(name, age, 3)
// });

// mySyncHook.call('liushiyu', '18');




//All Hook constructors take one optional argument, which is a list of argument names as strings.
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");
const hook = new SyncHook(["arg1", "arg2", "arg3"]);
//The best practice is to expose all hooks of a class in a hooks property:

class Car {
	constructor() {
		this.hooks = {
			accelerate: new SyncHook(["newSpeed"]),
			brake: new SyncHook(),
			a: new SyncHook(),
			calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
		};
	}

	/* ... */
}
const myCar = new Car();

// Use the tap method to add a consument
myCar.hooks.brake.tap("WarningLampPlugin", () =>  {console.log(`it's work`)});
myCar.hooks.brake.call()

myCar.hooks.a.tap("aaaa", () =>  {console.log(`i am the`)});
myCar.hooks.a.call()
