/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.toolbar = 'Full';
	config.toolbar_Full = [
		['Source','-','Save','NewPage','Preview','-','Templates'],
		['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
		['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
		'/',
		['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
		['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
		['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
		['Link','Unlink','Anchor'],
		'/',
		['Styles','Format','Font','FontSize'],
		['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
		['TextColor','BGColor']
	]; 
	var pathName = window.document.location.pathname;
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	config.filebrowserUploadUrl=projectName+"/xascf/util/ckeditorupload.shtml"; //上传文件的保存路径
    config.filebrowserImageUploadUrl = projectName+'/xascf/util/ckeditorupload.shtml'; //上传图片的保存路径
    config.filebrowserFlashUploadUrl =  projectName+'/xascf/util/ckeditorupload.shtml'; //上传flash的保存路径
};
