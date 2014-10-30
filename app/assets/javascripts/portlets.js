$( ".column" ).sortable({
      connectWith: ".column",
      handle: ".portlet-content",
    });
 
$( ".portlet" )
  .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" );


$( ".column2" ).sortable({
      connectWith: ".column2",
      handle: ".portlet-content",
      placeholder: "portlet-placeholder ui-corner-all"
    });