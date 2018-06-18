{
    init: function(elevators, floors) {
        console.clear();

        const numElevators = 5;
        var i = 0;
        var floorQueue = [];
        elevators.forEach(function(e) {    
            e.on("floor_button_pressed ", function(floorNum) {
                //if(e.destinationQueue.indexOf(floorNum) == -1) {
                    e.goToFloor(floorNum);
                //}
            }); // End floor_button_pressed
            
            e.on("passing_floor ", function(floorNum) {
                if(e.getPressedFloors().indexOf(floorNum) != -1) {
                    e.goToFloor(floorNum, true);
                }
                if(floorQueue.indexOf(floorNum) != -1) {
                    e.goToFloor(floorNum, true);
                    floorQueue = floorQueue.filter(function(f) { return f != floorNum ; });
                }
            }); // End passing_floor
            
            e.on("stopped_at_floor", function (floorNum) {
                var destinationQueue = e.destinationQueue.filter(function(f) { return f != floorNum ; });
                e.destinationQueue = destinationQueue;
                e.checkDestinationQueue();
                floorQueue = floorQueue.filter(function(f) { return f != floorNum ; });
            }); // End stopped_at_floor
            
            e.on("idle", function () {
                var floorNum = 0;
                if(floorQueue.length > 0) {
                    floorNum = floorQueue[0];
                    floorQueue = floorQueue.filter(function(f) { return f != floorNum ; });
                    console.log(floorNum);
                }
                e.goToFloor(floorNum, true);
                
            }); // End stopped_at_floor

        }); // End elevators init
        
        
        floors.forEach(function(f) {    
            f.on("up_button_pressed down_button_pressed ", function() {
                floorQueue.push(f.floorNum());
                console.log(floorQueue);
            }); // End *_button_pressed
        }); // End floors init

    },
        update: function(dt, elevators, floors) { }
}

