/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export const portal_schema_V1 = {
	entities: {
		dataSourceProperties: {
			api: "api",
			data: "data",
			version: "v9.2",
			schema: "portalschemav1",
			singleEntityURL:
				"{dataverseOrgUrl}/{api}/{data}/{version}/{entity}({entityId})",
			multiEntityURL: "{dataverseOrgUrl}/{api}/{data}/{version}/{entity}",
		},
		entity: [
			{
				relationships: "",
				_vscodeentityname: "websites",
				_dataverseenityname: "adx_websites",
				_displayname: "Website",
				_etc: "10026",
				_primaryidfield: "adx_websiteid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_foldername: "",
				_exporttype: "SingleFolder",
				_fetchQueryParameters:
					"?$select=adx_name,adx_websiteid,adx_website_language",
				_multiFileFetchQueryParameters:
					"?$select=adx_name,adx_websiteid,adx_website_language",
			},
			{
				_vscodeentityname: "websitelanguages",
				_dataverseenityname: "adx_websitelanguages",
				_displayname: "Website Language",
				_etc: "10046",
				_primaryidfield: "adx_websitelanguageid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_foldername: "",
				_exporttype: "SingleFile",
				_fetchQueryParameters:
					"?$select=adx_websitelanguageid,_adx_portallanguageid_value",
				_multiFileFetchQueryParameters:
					"?$select=adx_websitelanguageid,_adx_portallanguageid_value",
			},
			{
				_vscodeentityname: "portallanguages",
				_dataverseenityname: "adx_portallanguages",
				_displayname: "Portal Language",
				_etc: "10032",
				_primaryidfield: "adx_portallanguageid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_downloadThroughChild: "true",
				_foldername: "",
				_exporttype: "SingleFile",
				_fetchQueryParameters: "?$select=adx_lcid,adx_languagecode",
				_multiFileFetchQueryParameters:
					"?$select=adx_lcid,adx_languagecode",
			},
			{
				relationships: "",
				_vscodeentityname: "webpages",
				_dataverseenityname: "adx_webpages",
				_displayname: "Web Page",
				_etc: "10024",
				_primaryidfield: "adx_webpageid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_foldername: "web-pages",
				_exporttype: "SubFolders",
				_languagefield: "_adx_webpagelanguageid_value",
				_languagegroupby: "adx_rootwebpageid",
				_fetchQueryParameters:
					"?$filter=adx_webpageid eq {entityId} &$select=adx_name,adx_copy,adx_customcss,adx_customjavascript,adx_partialurl,_adx_webpagelanguageid_value,_adx_rootwebpageid_value&$count=true",
				_multiFileFetchQueryParameters:
					"?$filter=_adx_websiteid_value eq {websiteId} and _adx_webpagelanguageid_value ne null &$select=adx_webpageid,_adx_webpagelanguageid_value,adx_name,adx_copy,adx_customcss,adx_customjavascript,adx_partialurl,_adx_rootwebpageid_value&$count=true",
				_attributes: "adx_customcss,adx_customjavascript,adx_copy",
				_attributesExtension: new Map([
					["adx_customcss", "customcss.css"],
					["adx_customjavascript", "customjs.js"],
					["adx_copy", "webpage.copy.html"],
				]),
				_rootwebpageid: "_adx_rootwebpageid_value",
			},
			{
				relationships: "",
				_vscodeentityname: "webfiles",
				_dataverseenityname: "adx_webfiles",
				_displayname: "Web File",
				_etc: "10020",
				_primaryidfield: "adx_webfileid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_foldername: "web-files",
				_exporttype: "SingleFolder",
				_fetchQueryParameters:
					"?$filter=adx_webfileid eq {entityId} &$select=adx_name",
				_multiFileFetchQueryParameters:
					"?$filter=_adx_websiteid_value eq {websiteId} &$select=adx_webfileid,adx_name&$count=true",
				_attributes: "documentbody",
				_attributesExtension: new Map([["documentbody", "css"]]),
				_mappingEntityId: "annotationid", // Webfile in old schema are maintained with two dataverse entity adx_webfile and annotations. This Id acts as foreign key for that mapping
				_mappingEntity: "annotations",
				_mappingEntityFetchQuery: new Map([
					[
						"documentbody",
						"?$filter=_objectid_value eq {entityId} &$select=mimetype,documentbody,filename,annotationid,_objectid_value &$count=true &$orderby=modifiedon desc",
					],
				]),
			},
			{
				relationships: "",
				_vscodeentityname: "contentsnippet",
				_dataverseenityname: "adx_contentsnippets",
				_displayname: "Content Snippet",
				_etc: "10016",
				_primaryidfield: "adx_contentsnippetid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_foldername: "content-snippets",
				_exporttype: "SingleFolder",
				_languagefield: "_adx_contentsnippetlanguageid_value",
				_languagegroupby: "adx_name",
				_fetchQueryParameters:
					"?$filter=adx_contentsnippetid eq {entityId}&$select=adx_name,adx_value,_adx_contentsnippetlanguageid_value",
				_multiFileFetchQueryParameters:
					"?$filter=_adx_websiteid_value eq {websiteId} and _adx_contentsnippetlanguageid_value ne null &$select=adx_name,adx_value,adx_contentsnippetid,_adx_contentsnippetlanguageid_value&$count=true",
				_attributes: "adx_value",
				_attributesExtension: new Map([["adx_value", "html"]]),
			},
			{
				relationships: "",
				_vscodeentityname: "webtemplates",
				_dataverseenityname: "adx_webtemplates",
				_displayname: "Web Template",
				_etc: "10060",
				_primaryidfield: "adx_webtemplateid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_foldername: "web-templates",
				_exporttype: "SingleFolder",
				_fetchQueryParameters:
					"?$filter=adx_webtemplateid eq {entityId}&$select=adx_name,adx_source",
				_multiFileFetchQueryParameters:
					"?$filter=_adx_websiteid_value eq {websiteId}&$select=adx_name,adx_source,adx_webtemplateid&$count=true",
				_attributes: "adx_source",
				_attributesExtension: new Map([["adx_source", "html"]]),
			},
			{
				relationships: "",
				_vscodeentityname: "lists",
				_dataverseenityname: "adx_entitylists",
				_dataverseentitymetadata: new Map([
					["_dataverselogicalentityname", "adx_entityname"],
				]),
				_displayname: "Lists",
				_etc: "10060",
				_primaryidfield: "adx_entitylistid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_foldername: "lists",
				_exporttype: "SingleFolder",
				_fetchQueryParameters:
					"?$filter=adx_entitylistid eq {entityId} &$select=adx_name,adx_registerstartupscript,adx_entityname",
				_multiFileFetchQueryParameters:
					"?$filter=_adx_websiteid_value eq {websiteId} &$select=adx_name,adx_registerstartupscript,adx_entitylistid,adx_entityname&$count=true",
				_attributes: "adx_registerstartupscript",
				_attributesExtension: new Map([
					["adx_registerstartupscript", "list.customjs.js"],
				]),
			},
			{
				relationships: "",
				_vscodeentityname: "basicforms",
				_dataverseenityname: "adx_entityforms",
				_dataverseentitymetadata: new Map([
					["_dataverselogicalentityname", "adx_entityname"],
					["_dataverseformname", "adx_formname"],
				]),
				_displayname: "Basic Forms",
				_etc: "10060",
				_primaryidfield: "adx_entityformid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_foldername: "basic-forms",
				_exporttype: "SingleFolder",
				_fetchQueryParameters:
					"?$filter=adx_entityformid eq {entityId} &$select=adx_name,adx_registerstartupscript,adx_entityname,adx_formname",
				_multiFileFetchQueryParameters:
					"?$filter=_adx_websiteid_value eq {websiteId}&$select=adx_name,adx_registerstartupscript,adx_entityformid,adx_entityname,adx_formname&$count=true",
				_attributes: "adx_registerstartupscript",
				_attributesExtension: new Map([
					["adx_registerstartupscript", "basicform.customjs.js"],
				]),
			},
			{
				relationships: "",
				_vscodeentityname: "advancedforms",
				_dataverseenityname: "adx_webforms",
				_displayname: "Advanced Forms",
				_etc: "10060",
				_primaryidfield: "adx_webformid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_foldername: "advanced-forms",
				_exporttype: "SubFolders",
				_fetchQueryParameters:
					"?$filter=adx_webformid eq {entityId} &$select=adx_name&$expand=adx_webformstep_webform($select=adx_name,adx_registerstartupscript,adx_webformstepid,adx_targetentitylogicalname,adx_formname)",
				_multiFileFetchQueryParameters:
					"?$filter=_adx_websiteid_value eq {websiteId} &$select=adx_name,adx_webformid&$expand=adx_webformstep_webform($select=adx_name,adx_registerstartupscript,adx_webformstepid,adx_targetentitylogicalname,adx_formname)&$count=true",
				_attributes: "adx_webformstep_webform",
				_attributesExtension: new Map([]),
			},
			{
				relationships: "",
				_vscodeentityname: "advancedformsteps",
				_dataverseenityname: "adx_webformsteps",
				_dataverseentitymetadata: new Map([
					[
						"_dataverselogicalentityname",
						"adx_targetentitylogicalname",
					],
					["_dataverseformname", "adx_formname"],
				]),
				_displayname: "Advanced Form Steps",
				_etc: "10060",
				_primaryidfield: "adx_webformstepid",
				_primarynamefield: "adx_name",
				_disableplugins: "true",
				_foldername: "advanced-form-steps",
				_exporttype: "SubFolders",
				_fetchQueryParameters:
					"?$filter=adx_webformstepid eq {entityId} &$select=adx_name,adx_registerstartupscript,adx_webformstepid,adx_targetentitylogicalname,adx_formname",
				_multiFileFetchQueryParameters:
					"?$filter=_adx_websiteid_value eq {websiteId} &$select=adx_name,adx_registerstartupscript,adx_webformstepid,adx_targetentitylogicalname,adx_formname&$count=true",
				_attributes: "adx_registerstartupscript",
				_attributesExtension: new Map([
					[
						"adx_registerstartupscript",
						"advancedformstep.customjs.js",
					],
				]),
			},
		],
		"_xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
	},
};

export const portal_schema_V2 = {
	entities: {
		dataSourceProperties: {
			api: "api",
			data: "data",
			version: "v9.2",
			schema: "portalschemav2",
			singleEntityURL:
				"{dataverseOrgUrl}/{api}/{data}/{version}/{entity}({entityId})",
			multiEntityURL: "{dataverseOrgUrl}/{api}/{data}/{version}/{entity}",
		},
		entity: [
			{
				relationships: "",
				_vscodeentityname: "websites",
				_dataverseenityname: "powerpagesites",
				_displayname: "Website",
				_etc: "10026",
				_primaryidfield: "powerpagesiteid",
				_primarynamefield: "name",
				_disableplugins: "true",
				_foldername: "",
				_exporttype: "SingleFolder",
				_fetchQueryParameters: "?$select=name,powerpagesiteid,content",
				_multiFileFetchQueryParameters:
					"?$select=name,powerpagesiteid,content",
			},
			{
				relationships: "",
				_vscodeentityname: "websitelanguages",
				_dataverseenityname: "powerpagesitelanguages",
				_displayname: "Power Page Site Language",
				_foldername: "",
				_etc: "10273",
				_primaryidfield: "powerpagesitelanguageid",
				_primarynamefield: "name",
				_disableplugins: "false",
				_fetchQueryParameters:
					"?$select=powerpagesitelanguageid,languagecode,lcid",
				_multiFileFetchQueryParameters:
					"?$select=powerpagesitelanguageid,languagecode,lcid",
			},
			{
				relationships: "",
				_vscodeentityname: "portallanguages",
				_dataverseenityname: "powerpagesitelanguages",
				_displayname: "Power Page Site Language",
				_foldername: "",
				_etc: "10273",
				_primaryidfield: "powerpagesitelanguageid",
				_primarynamefield: "name",
				_disableplugins: "false",
				_fetchQueryParameters:
					"?$select=powerpagesitelanguageid,languagecode,lcid",
				_multiFileFetchQueryParameters:
					"?$select=powerpagesitelanguageid,languagecode,lcid",
			},
			{
				relationships: "",
				_vscodeentityname: "webpages",
				_dataverseenityname: "powerpagecomponents",
				_displayname: "Web Page",
				_etc: "10271",
				_primaryidfield: "powerpagecomponentid",
				_primarynamefield: "name",
				_disableplugins: "false",
				_exporttype: "SubFolders",
				_languagefield: "_powerpagesitelanguageid_value",
				_foldername: "web-pages",
				_fetchQueryParameters:
					"?$filter=powerpagecomponentid eq {entityId}&$select=name,content,powerpagesitelanguageid",
				_multiFileFetchQueryParameters:
					"?$filter=_powerpagesiteid_value eq {websiteId} and powerpagecomponenttype eq 2 and _powerpagesitelanguageid_value ne null&$select=name,content,_powerpagesitelanguageid_value&$count=true",
				_attributes:
					"content.customcss,content.customjavascript,content.copy",
				_attributesExtension: new Map([
					["content.customcss", "customcss.css"],
					["content.customjavascript", "customjs.js"],
					["content.copy", "webpage.copy.html"],
				]),
				_rootwebpageid: "content.rootwebpageid",
			},
			{
				relationships: "",
				_vscodeentityname: "webfiles",
				_dataverseenityname: "powerpagecomponents",
				_displayname: "Web File",
				_etc: "10271",
				_primaryidfield: "powerpagecomponentid",
				_primarynamefield: "name",
				_disableplugins: "false",
				_exporttype: "SingleFolder",
				_foldername: "web-files",
				_fetchQueryParameters:
					"?$filter=powerpagecomponentid eq {entityId}&$select=name",
				_multiFileFetchQueryParameters:
					"?$filter=_powerpagesiteid_value eq {websiteId} and powerpagecomponenttype eq 3 &$select=name,content,_powerpagesitelanguageid_value&$count=true",
				_attributes: "filecontent",
				_attributesExtension: new Map([["filecontent", "css"]]),
				_mappingEntityFetchQuery: new Map([
					["filecontent", "({entityId})/filecontent"],
				]),
			},
			{
				relationships: "",
				_vscodeentityname: "contentsnippet",
				_dataverseenityname: "powerpagecomponents",
				_displayname: "Content Snippet",
				_etc: "10271",
				_primaryidfield: "powerpagecomponentid",
				_primarynamefield: "name",
				_disableplugins: "false",
				_exporttype: "SingleFolder",
				_languagefield: "_powerpagesitelanguageid_value",
				_foldername: "content-snippets",
				_fetchQueryParameters:
					"?$filter=powerpagecomponentid eq {entityId}&$select=name,content",
				_multiFileFetchQueryParameters:
					"?$filter=_powerpagesiteid_value eq {websiteId} and powerpagecomponenttype eq 7 and _powerpagesitelanguageid_value ne null &$select=name,content,_powerpagesitelanguageid_value&$count=true",
				_attributes: "content.value",
				_attributesExtension: new Map([["content.value", "html"]]),
			},
			{
				relationships: "",
				_vscodeentityname: "webtemplates",
				_dataverseenityname: "powerpagecomponents",
				_displayname: "Web Template",
				_etc: "10271",
				_primaryidfield: "powerpagecomponentid",
				_primarynamefield: "name",
				_disableplugins: "false",
				_exporttype: "SingleFolder",
				_foldername: "web-templates",
				_fetchQueryParameters:
					"?$filter=powerpagecomponentid eq {entityId}&$select=name,content",
				_multiFileFetchQueryParameters:
					"?$filter=_powerpagesiteid_value eq {websiteId} and powerpagecomponenttype eq 8 &$select=name,content,_powerpagesitelanguageid_value&$count=true",
				_attributes: "content.source",
				_attributesExtension: new Map([["content.source", "html"]]),
			},
			{
				relationships: "",
				_vscodeentityname: "lists",
				_dataverseenityname: "powerpagecomponents",
				_dataverseentitymetadata: new Map([
					["_dataverselogicalentityname", "content.entityname"],
				]),
				_displayname: "Lists",
				_etc: "10271",
				_primaryidfield: "powerpagecomponentid",
				_primarynamefield: "name",
				_disableplugins: "false",
				_exporttype: "SingleFolder",
				_foldername: "lists",
				_fetchQueryParameters:
					"?$filter=powerpagecomponentid eq {entityId}&$select=name,content",
				_multiFileFetchQueryParameters:
					"?$filter=_powerpagesiteid_value eq {websiteId} and powerpagecomponenttype eq 17 &$select=name,content&$count=true",
				_attributes: "content.registerstartupscript",
				_attributesExtension: new Map([
					["content.registerstartupscript", "list.customjs.js"],
				]),
			},
			{
				relationships: "",
				_vscodeentityname: "basicforms",
				_dataverseenityname: "powerpagecomponents",
				_dataverseentitymetadata: new Map([
					["_dataverselogicalentityname", "content.entityname"],
					["_dataverseformname", "content.formname"],
				]),
				_displayname: "Basic Forms",
				_etc: "10271",
				_primaryidfield: "powerpagecomponentid",
				_primarynamefield: "name",
				_disableplugins: "false",
				_exporttype: "SingleFolder",
				_foldername: "basic-forms",
				_fetchQueryParameters:
					"?$filter=powerpagecomponentid eq {entityId}&$select=name,content",
				_multiFileFetchQueryParameters:
					"?$filter=_powerpagesiteid_value eq {websiteId} and powerpagecomponenttype eq 15 &$select=name,content&$count=true",
				_attributes: "content.registerstartupscript",
				_attributesExtension: new Map([
					["content.registerstartupscript", "basicform.customjs.js"],
				]),
			},
			{
				relationships: "",
				_vscodeentityname: "advancedforms",
				_dataverseenityname: "powerpagecomponents",
				_displayname: "Advanced Forms",
				_etc: "10271",
				_primaryidfield: "powerpagecomponentid",
				_primarynamefield: "name",
				_disableplugins: "false",
				_exporttype: "SubFolders",
				_foldername: "advanced-forms",
				_fetchQueryParameters:
					"?$filter=powerpagecomponentid eq {entityId}&$select=name,content",
				_multiFileFetchQueryParameters:
					"?$filter=_powerpagesiteid_value eq {websiteId} and powerpagecomponenttype eq 19 &$select=name,content &$count=true",
				_attributes: "content.webFormSteps",
				_attributesExtension: new Map([]),
			},
			{
				relationships: "",
				_vscodeentityname: "advancedformsteps",
				_dataverseenityname: "powerpagecomponents",
				_dataverseentitymetadata: new Map([
					[
						"_dataverselogicalentityname",
						"content.targetentitylogicalname",
					],
					["_dataverseformname", "content.formname"],
				]),
				_displayname: "Advanced Form Steps",
				_etc: "10060",
				_primaryidfield: "powerpagecomponentid",
				_primarynamefield: "name",
				_disableplugins: "true",
				_foldername: "advanced-form-steps",
				_exporttype: "SubFolders",
				_fetchQueryParameters:
					"?$filter=powerpagecomponentid eq {entityId}&$select=name,content",
				_multiFileFetchQueryParameters:
					"?$filter=_powerpagesiteid_value eq {websiteId} and powerpagecomponenttype eq 20 &$select=name,content &$count=true",
				_attributes: "content.registerstartupscript",
				_attributesExtension: new Map([
					[
						"content.registerstartupscript",
						"advancedformstep.customjs.js",
					],
				]),
			},
		],
	},
};
