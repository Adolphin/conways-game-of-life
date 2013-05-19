//Initialize the TableArray.
function TableArrayInitialize()
{
	TableArray=new Array();
	for(var i=0;i<Rows;i++){
		TableArray[i]=new Array();
		for(var j=0;j<Cols;j++){
			TableArray[i][j]=0;
		}
	}
}

//Make a copy of the TableArray.
function TableArrayCopy(method)
{
	if (method="load"){
		TableArray_Temp=new Array();
		for(var i=0;i<Rows;i++){
			TableArray_Temp[i]=new Array();
			for(var j=0;j<Cols;j++){
				TableArray_Temp[i][j]=TableArray[i][j];
			}
		}
	}
	if (method="get"){
		TableArray=new Array();
		for(var i=0;i<Rows;i++){
			TableArray[i]=new Array();
			for(var j=0;j<Cols;j++){
				TableArray[i][j]=TableArray_Temp[i][j];
			}
		}
	}
}

//Initialize Configurations.
function ConfigInitialize()
{
	$("input.text").removeClass("ErrorTxt");
	$("input#txRows").val(Rows);
	$("input#txCols").val(Cols);
	$("input#txCellSize").val(CellSize);
	$("input#txLiveColor").val(LiveColor.substring(1));
	$("input#txDiedColor").val(DiedColor.substring(1));
	$("input#txBorderColor").val(BorderColor.substring(1));
	$("input#cbIsBorder").attr("checked",IsBorder);
	$("input#cbIsBorder").attr("checkflag",(IsBorder?"1":"0"));
	$("input#txStepTime").val(StepTime);
}

//Set Configuration after checkout.
function ConfigSet()
{
	try{
		ConfigCheck();
		Rows=parseInt($("input#txRows").val());
		Cols=parseInt($("input#txCols").val());
		CellSize=parseInt($("input#txCellSize").val());
		LiveColor="#"+$("input#txLiveColor").val();
		DiedColor="#"+$("input#txDiedColor").val();
		BorderColor="#"+$("input#txBorderColor").val();
		IsBorder=($("input#cbIsBorder").attr("checkflag")=="1")?true:false;
		StepTime=parseInt($("input#txStepTime").val());
		return true;
	}
	catch(e){
		window.alert(e.message);
		return false;
	}
}
//Check Configuration.
function ConfigCheck()
{
	var err="";
	if ( isNaN(parseInt($("input#txRows").val())) || parseInt($("input#txRows").val())<=0 ){
		err+="行数输入有误，请输入合理的正整数\n"+"Rows value is illegal.\n";
		$("input#txRows").addClass("ErrorTxt");
		$("input#txRows").one("focus",function(){
			$(this).removeClass("ErrorTxt");
		});
	}
	if ( isNaN(parseInt($("input#txCols").val())) || parseInt($("input#txCols").val())<=0 ){
		err+="列数输入有误，请输入合理的正整数\n"+"Cols value is illegal.\n";
		$("input#txCols").addClass("ErrorTxt");
		$("input#txCols").one("focus",function(){
			$(this).removeClass("ErrorTxt");
		});
	}
	if ( isNaN(parseInt($("input#txCellSize").val())) || parseInt($("input#txCellSize").val())<=0 ){
		err+="单元格大小输入有误，请输入合理的正整数\n"+"Cell Size value is illegal.\n";
		$("input#txCellSize").addClass("ErrorTxt");
		$("input#txCellSize").one("focus",function(){
			$(this).removeClass("ErrorTxt");
		});
	}
	if ( isNaN(parseInt($("input#txStepTime").val())) || parseInt($("input#txStepTime").val())<=0 ){
		err+="演化周期输入有误，请输入合理的正整数\n"+"Step Time value is illegal.\n";
		$("input#txStepTime").addClass("ErrorTxt");
		$("input#txStepTime").one("focus",function(){
			$(this).removeClass("ErrorTxt");
		});
	}
	var reg=new RegExp("^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
	if ( !reg.test($("input#txLiveColor").val()) ){
		err+="亮颜色代码输入有误\n"+"Live Color code is illegal.\n";
		$("input#txLiveColor").addClass("ErrorTxt");
		$("input#txLiveColor").one("focus",function(){
			$(this).removeClass("ErrorTxt");
		});
	}
	if ( !reg.test($("input#txDiedColor").val()) ){
		err+="暗颜色代码输入有误\n"+"Died Color code is illegal.\n";
		$("input#txDiedColor").addClass("ErrorTxt");
		$("input#txDiedColor").one("focus",function(){
			$(this).removeClass("ErrorTxt");
		});
	}
	if ( !reg.test($("input#txBorderColor").val()) ){
		err+="亮颜色代码输入有误\n"+"Border Color code is illegal.\n";
		$("input#txBorderColor").addClass("ErrorTxt");
		$("input#txBorderColor").one("focus",function(){
			$(this).removeClass("ErrorTxt");
		});
	}
	if(err!="") throw new Error(err);
}

/*待重用
function Revive(row,col)
{
	TableArray[row][col]=1;
	$("table#tbConway tr td#cw"+row+"_"+col).css("background",LiveColor);
}

function Kill(row,col)
{
	TableArray[row][col]=0;
	$("table#tbConway tr td#cw"+row+"_"+col).css("background",DiedColor);
}
*/


//Paint Table.
function PaintTable(tableArray)
{
	$("div.ConwayTable").empty();
	$("div.ConwayTable").append("<table align='center' cellspacing=0 cellpadding=0 id='tbConway'></table>");
	for(var i=0;i<Rows;i++){
		$("table#tbConway").append("<tr id=cw"+i+"></tr>");
		for(var j=0;j<Cols;j++){
			$("tr#cw"+i).append("<td id=cw"+i+"_"+j+"></td>");
			if(tableArray[i][j]==1){
				$("table#tbConway tr td#cw"+i+"_"+j).css("background",LiveColor);	//Revive(i,j);
				$("table#tbConway tr td#cw"+i+"_"+j).attr("name","alive");
			}
			if(tableArray[i][j]==0){
				$("table#tbConway tr td#cw"+i+"_"+j).css("background",DiedColor);	//Kill(i,j);
				$("table#tbConway tr td#cw"+i+"_"+j).attr("name","dead");
			}
		}
	}
	$("table#tbConway tr td").css("width",CellSize+"px");
	$("table#tbConway tr td").css("height",CellSize+"px");
	if(IsBorder){
		$("table#tbConway tr td").css("border","1px solid "+BorderColor);
	}
	$("table#tbConway").css("border","2px solid "+BorderColor);
	
	$("table#tbConway tr td").bind("click",function(){
		var i=getRowById($(this).attr("id"));
		var j=getColById($(this).attr("id"));
		switch(tableArray[i][j]){
			case 0:	//Revive(i,j);
				tableArray[i][j]=1;
				$(this).css("background",LiveColor);
				$(this).attr("name","alive");
				break;
			case 1:	//Kill(i,j);
				tableArray[i][j]=0;
				$(this).css("background",DiedColor);
				$(this).attr("name","dead");
		}
	});
}

function RefreshTable(tableArray)
{
	for(var i=0;i<Rows;i++){
		for(var j=0;j<Cols;j++){
			if( tableArray[i][j]==1 && $("table#tbConway tr td#cw"+i+"_"+j).attr("name")=="dead" ){
				$("table#tbConway tr td#cw"+i+"_"+j).css("background",LiveColor);
				$("table#tbConway tr td#cw"+i+"_"+j).attr("name","alive");
			}
			if( tableArray[i][j]==0 && $("table#tbConway tr td#cw"+i+"_"+j).attr("name")=="alive" ){
				$("table#tbConway tr td#cw"+i+"_"+j).css("background",DiedColor);
				$("table#tbConway tr td#cw"+i+"_"+j).attr("name","dead");
			}
		}
	}
}

function getRowById(id)
{
	return parseInt(id.substring(2,id.indexOf("_")));
}

function getColById(id)
{
	return parseInt(id.substring(id.indexOf("_")+1));
}

function generate(tableArray)
{
	for(var i=0;i<Rows;i++){
		for(var j=0;j<Cols;j++){
			if (tableArray[i][j]%2==1){
				if(i>0){
					if(j>0) tableArray[i-1][j-1]=tableArray[i-1][j-1]+2;
					tableArray[i-1][j]=tableArray[i-1][j]+2;
					if(j+1<Cols) tableArray[i-1][j+1]=tableArray[i-1][j+1]+2;
				}	
					if(j>0) tableArray[i][j-1]=tableArray[i][j-1]+2;
					if(j+1<Cols) tableArray[i][j+1]=tableArray[i][j+1]+2;
				if(i+1<Rows){
					if(j>0) tableArray[i+1][j-1]=tableArray[i+1][j-1]+2;
					tableArray[i+1][j]=tableArray[i+1][j]+2;
					if(j+1<Cols) tableArray[i+1][j+1]=tableArray[i+1][j+1]+2;
				}
			}
		}
	}
	
	for(var i=0;i<Rows;i++){
		for(var j=0;j<Cols;j++){
			/*
				Any live cell with fewer than two live neighbours dies, as if caused by under-population.
				Any live cell with two or three live neighbours lives on to the next generation.
				Any live cell with more than three live neighbours dies, as if by overcrowding.
				Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
			*/
			if ((tableArray[i][j]%2)==1){
				if(tableArray[i][j]<5 || tableArray[i][j]>7){
					tableArray[i][j]=0;
				}
				else{
					tableArray[i][j]=1;
				}
			}
			else{
				if(tableArray[i][j]==6)	tableArray[i][j]=1;
				else{
					tableArray[i][j]=0;
				}
			}
		}
	}
	RefreshTable(tableArray);
}





//Continue to Evalution.
function Play()
{
	window.alert("Play");
}
//Pause
function Pause()
{
	window.alert("Pause");
}