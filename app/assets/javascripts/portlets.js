/*
	This is a fun js file, it uses jQuery UI to let us
	make the different modules sortable as well as the
	stocks sortable. We need two different columns here because
	we have different settings for each one
*/

// Modules sortable portlets
// we don't have the placeholder attribute
// because we create our own via CSS which
// 
$( ".column" ).sortable({
      connectWith: ".column",
      handle: ".portlet-content",
});

// globally add these classes to the portlet elements
// this is the same for both columns
$( ".portlet" )
  .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" );


// Stocks sortable portlets
$( ".column2" ).sortable({
      connectWith: ".column2",
      handle: ".portlet-content",
      placeholder: "portlet-placeholder ui-corner-all"
});