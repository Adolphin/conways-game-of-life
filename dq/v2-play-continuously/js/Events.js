//Document Initialize.
$(document).ready(function(){
	ConfigInitialize();
	TableArrayInitialize();
	PaintTable(TableArray);
});

//Setting button on TOP clicked.
$(function(){
	$("input#btConfig").click(function(){
		ConfigInitialize();
		if ($("div.Menu").css("display")=="none"){
			$("div.Menu").slideDown("fast").show();
		}
		else{
			$("div.Menu").slideUp("slow");
		}
	});
});
//IsBorder Checkbox clicked.
$(function(){
	$("input#cbIsBorder").click(function(){
		if($("input#cbIsBorder").attr("checkflag")=="1"){
			$(this).attr("checkflag","0");
		}
		else{
			$(this).attr("checkflag","1");
		}
	});
});

//Okay Button Clicked.
$(function(){
	$("input#btOk").click(function(){
		if(ConfigSet()){
			$("div.Menu").slideUp("slow");
			TableArrayInitialize();
			PaintTable(TableArray);
		}
	});
});

//Cancel Button Clicked.
$(function(){
	$("input#btCancel").click(function(){
		ConfigInitialize();
		$("div.Menu").slideUp("slow");
	});
});

//Stop button clicked then clear the Interval and recovery the Table and TableArray.
$(function(){
	$("input#btStop").click(function(){
		clearInterval(PlayHandle);
		TableArrayInitialize();
		RefreshTable(TableArray);
		$("input#btPlayPause").addClass("Play");
		$("input#btPlayPause").removeClass("Pause");
		$("input#btPlayPause").attr("name","Play");
	});
});


//Play/Pause Button Clicked to switch play or pause.
$(function(){
	$("input#btPlayPause").click(function(){
		$(this).toggleClass("Play");
		$(this).toggleClass("Pause");
		if ($(this).attr("name")=="Play"){
			PlayHandle=Play(TableArray);
			$(this).attr("name","Pause");
		}
		else{
			Pause(PlayHandle);
			$(this).attr("name","Play");
		}
	});
});

//Next button clicked.
$(function(){
	$("input#btNext").click(function(){
		/*
		if ($("input#btPlayPause").attr("class")=="Pause"){
			$("input#btPlayPause").addClass("Play");
			$("input#btPlayPause").removeClass("Pause");
			Pause();
		}
		*/
		generate(TableArray);
	});
	
});
