(<any>$('.window')).window();
(<any>$('.listview')).listview();
(<any>$('.desktop-listview')).listview();
(<any>$('.menu-bar')).menubar();
(<any>$('.taskbar ul.start')).menubar({
    position_toplevel: {
        my: "left bottom",
        at: "left top",
    },
});

var update_counter:Function;
var update_timer:Function;

var timer_val = 0;
var timer_id:number;

var mine_area = document.getElementById("mine-area");
var minefield = new (<any>window).Minefield(mine_area, function(status:number) {
    var smile = $(".mine-reset-button .mine-reset-button-inner");
    var bg_pos = "0 0";
    if (status === -1) {
        bg_pos = "-17px 0";
    }
    if (status === -2) {
        bg_pos = "-51px 0";
    }
    smile.css({
        "background-position": bg_pos,
    });

    if (status === 0) {
        timer_id = window.setInterval(update_timer, 1 * 1000);
    }
    if (status < 0 || status === 1) {
        window.clearInterval(timer_id);
        if (status === 1) {
            var num_counter = minefield.num_mines - minefield.num_flags;
            var counter_obj = $(".mine-counter");
            update_counter(num_counter, counter_obj);

            timer_val = 0;
            // timer_id = null;
            var timer_obj = $(".mine-timer");
            update_counter(0, timer_obj);
        }
    }
});

update_timer = function() {
    timer_val += 1;
    var timer_obj = $(".mine-timer");
    update_counter(timer_val, timer_obj);
}

update_counter = function(val:number, counter:JQuery) {
    // if (val > 999) {
    //     val = 999;
    // }
    if (val < 0) {
        val = 0;
    }
    var hundredFloor:number = Math.floor(val / 100);
    var hundredDigit:number;
        if(val >= 5000){
            hundredDigit = hundredFloor - 50
        }else if(val>=4000){
            hundredDigit = hundredFloor - 40
        }else if(val>=3000){
            hundredDigit = hundredFloor - 30
        }else if(val>=2000){
            hundredDigit = hundredFloor - 20
        }else if(val>=1000){
            hundredDigit = hundredFloor - 10
        }else{
            hundredDigit = hundredFloor
        };

    var digits:Array<number> = [
        hundredDigit,
        Math.floor(val / 10) % 10,
        val % 10
    ];
    for (var i = 0; i < 3; i++) {
        var d = digits[i];
        var child = $(counter.children()[i]);
        child.removeClass();
        child.addClass("digit digit-" + d);
    }
};
minefield.on_rclick_func = function(x:any, y:any) {
    var num_counter = minefield.num_mines - minefield.num_flags;
    var counter_obj = $(".mine-counter");
    update_counter(num_counter, counter_obj);
};

minefield.init_board(30, 16, 99);


(function mineWindowUI(){
    document.querySelector('.userInterface')!.addEventListener('click',function(){
        mineWindowUIResize(null,null,null,null)
    });

})();

function mineWindowUIResize(a:any,b:any,c:any,d:any){
    if(!a){
        a = Number(prompt('가로 칸 수를 입력하세요(9~110)'));
        b = Number(prompt('세로 줄 수를 입력하세요(9~50)'));
        c = Number(prompt('지뢰의 개수를 입력하세요'));
        d = Number(prompt('칸당 최대 지뢰의 개수를 입력하세요(1~4)'));

        a = Math.min(Math.max(9,a),110);
        b = Math.min(Math.max(9,b),50);
        c = Math.min(Math.max(1,c),a*b);
        d = Math.min(Math.max(1,d),4);
    }

    minefield.init_board(a, b, c, d);


    (<HTMLElement>document.querySelector('.mine-head-area')).style.width = String(16*a+2)+'px';
    (<HTMLElement>document.querySelector('.mine-window')).style.width = String(16*a+22)+'px';
    (<HTMLElement>document.querySelector('.mine-window')).style.height = String(16*b+107)+'px';
    (<HTMLElement>document.querySelector('.mine-area')).style.width = String(16*a)+'px';
    (<HTMLElement>document.querySelector('.mine-area')).style.height = String(16*b)+'px';

}

(function optionBarModule(){
    document.querySelector('.optionBtn')!.addEventListener('click',function(){
        (<HTMLElement>document.querySelector('.subMenu')).style.display='block';
        (<HTMLElement>document.querySelector('.subMenu')).style.zIndex='10000';
        (<HTMLElement>document.querySelector('.menu-modal')).style.display='block';
        (<HTMLElement>document.querySelector('.menu-modal')).style.zIndex='9999';

        $('.optionBtn').css({borderTop:'1px solid gray',
            borderLeft:'1px solid gray',
            borderBottom:'1px solid white',
            borderRight:'1px solid white'})
    });
    
    document.querySelector('.menu-modal')!.addEventListener('click',function(){
        (<HTMLElement>document.querySelector('.subMenu')).style.display='none';
        (<HTMLElement>document.querySelector('.menu-modal')).style.display='none';
        $('.optionBtn').css({border:'none'})
    });

    document.querySelector('.subMenu')!.addEventListener('click',function(){
        (<HTMLElement>document.querySelector('.subMenu')).style.display='none';
        (<HTMLElement>document.querySelector('.menu-modal')).style.display='none';
        $('.optionBtn').css({border:'none'})
    });

})()
