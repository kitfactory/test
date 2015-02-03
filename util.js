
$( function(){
    console.log( "Hello" );
    var vm = new Vue({
        el: "#app",
        data: {
        message: "Hello World",
        item: [
                { desc: "foo" },
                { desc: "bar" },
                { desc: "baz" },
            ],
        }
    });

    $("#sorttask").sortable();
    $("#sorttask").disableSelection();
    
}());

function is_off( d )
{
    day = d.getDay();
    if( day == 0 || day == 6 ){
        return true;
    }else{
        return false;
    }
}

function get_next_avairable_day( current )
{
    var d = new Date();
    d.setTime( current.getTime());
    console.log( d.toDateString() );
    while( true ){
        d.setTime( d.getTime() + 86400000 );
        if( is_off( d ) != true ){
            break;
        }
    }
    return d;
}

function get_task_end( item )
{
    var end = item.start_point + item.manday;
    item.end_date = item.start_date;
    if( end > 1.0 ){
        item.end_point = end - Math.floor( end  );
    }else{
        item.end_point = end;
    }
    var require_days = Math.floor( end );
    for( i = 0 ; i < require_days ; i++ ){
        item.end_date = get_next_avairable_day( item.end_date );    
    }
}


function button_pushed( b )
{
    test_get_task_end();
}

function test_get_next_avairable_day()
{
    var d = new Date( "2015-01-31T00:00" );
    var nd =get_next_avairable_day( d );
    console.log( nd.toDateString() );
}

function test_get_task_end()
{
    var item = {};
    item.start_date = new Date("2015-01-30");
    item.start_point = 0;
    item.manday = 1.0;
    
    get_task_end( item );
    console.log( item.end_date.toDateString() + "," +  item.end_point );
    
    item.start_date = new Date("2015-02-02");
    item.start_point = 0.5;
    item.manday = 1;
    get_task_end( item );
    console.log( item.end_date.toDateString() + "," +  item.end_point );
}
