var theList,theExtraList,toggleWithKeyboard=false;(function(a){setCommentsList=function(){var c,e,h,l=0,g,i,d,k;c=a('.tablenav input[name="_total"]',"#comments-form");e=a('.tablenav input[name="_per_page"]',"#comments-form");h=a('.tablenav input[name="_page"]',"#comments-form");g=function(n,m){var o=a("#"+m.element);if(o.is(".unapproved")){o.find("div.comment_status").html("0")}else{o.find("div.comment_status").html("1")}a("span.pending-count").each(function(){var p=a(this),r,q;r=p.html().replace(/[^0-9]+/g,"");r=parseInt(r,10);if(isNaN(r)){return}q=a("#"+m.element).is("."+m.dimClass)?1:-1;r=r+q;if(r<0){r=0}p.closest("#awaiting-mod")[0==r?"addClass":"removeClass"]("count-0");f(p,r);j()})};i=function(q,t){var w=a(q.target).attr("className"),m,o,p,s,u,v,r;q.data._total=c.val()||0;q.data._per_page=e.val()||0;q.data._page=h.val()||0;q.data._url=document.location.href;if(w.indexOf(":trash=1")!=-1){m=w.replace(/.*?comment-([0-9]+).*/,"$1");o=a("#comment-"+m);note=a("#undo-holder").html();if(o.is("tr")){p=o.children(":visible").length;r=a(".author strong",o).html();s=a('<tr id="trashundo-'+m+'" style="display:none;"><td class="trash-undo" colspan="'+p+'">'+note+"</td></tr>")}else{r=a(".comment-author",o).html();s=a('<div id="trashundo-'+m+'" style="display:none;" class="trash-undo">'+note+"</div>")}o.before(s);s.fadeIn(400);a("strong","#trashundo-"+m).html(r);u=a("a.undo-trash","#trashundo-"+m);u.attr("href","comment.php?action=untrashcomment&c="+m+"&_ajax_nonce="+q.data._ajax_nonce);u.attr("className","delete:the-comment-list:comment-"+m+"::untrash=1 vim-z vim-destructive");u.click(function(){t.wpList.del(this);a("#trashundo-"+m).fadeOut(250,function(){a(this).remove();a("#comment-"+m).css("backgroundColor","").fadeIn(400)});return false});v=window.setTimeout(function(){a("#trashundo-"+m).fadeOut("slow",function(){a(this).remove()})},200000)}return q};d=function(m,n,o){if(n<l){return}if(o){l=n}c.val(m.toString());a("span.total-type-count").each(function(){f(a(this),m)})};function j(s){var r=a("#dashboard_right_now"),o,q,p,m;s=s||0;if(isNaN(s)||!r.length){return}o=a("span.total-count",r);q=a("span.approved-count",r);p=b(o);m=b(q);if(p){p=p+s;m=p-b(a("span.pending-count",r));f(o,p);f(q,m)}}function b(m){var o=parseInt(m.html().replace(/[^0-9]+/g,""),10);if(isNaN(o)){return 0}return o}function f(m,o){if(isNaN(o)){return}o=o<1?"0":o.toString();if(o.length>3){o=o.substr(0,o.length-3)+thousandsSeparator+o.substr(-3)}m.html(o)}k=function(m,n){var q,o,p,u=a(n.target).parent().is("span.untrash"),t,s;function v(r){if(a(n.target).parent().is("span."+r)){return 1}else{if(a("#"+n.element).is("."+r)){return -1}}return 0}t=v("spam");s=v("trash");if(u){s=-1}a("span.pending-count").each(function(){var r=a(this),x=b(r),w=a("#"+n.element).is(".unapproved");if(a(n.target).parent().is("span.unapprove")||(u&&w)){x=x+1}else{if(w){x=x-1}}if(x<0){x=0}r.closest("#awaiting-mod")[0==x?"addClass":"removeClass"]("count-0");f(r,x);j()});a("span.spam-count").each(function(){var r=a(this),w=b(r)+t;f(r,w)});a("span.trash-count").each(function(){var r=a(this),w=b(r)+s;f(r,w)});if(a("#dashboard_right_now").length){p=t||s||0;if(p>0){j(-1)}else{if(p<0){j(1)}}}else{if(("object"==typeof m)&&l<n.parsed.responses[0].supplemental.time){o=n.parsed.responses[0].supplemental.pageLinks||"";if(a.trim(o)){a(".tablenav-pages").find(".page-numbers").remove().end().append(a(o))}else{a(".tablenav-pages").find(".page-numbers").remove()}}q=c.val()?parseInt(c.val(),10):0;q=q-t-s;if(q<0){q=0}d(q,m,false)}if(theExtraList.size()==0||theExtraList.children().size()==0||u){return}theList.get(0).wpList.add(theExtraList.children(":eq(0)").remove().clone());a("#get-extra-comments").submit()};theExtraList=a("#the-extra-comment-list").wpList({alt:"",delColor:"none",addColor:"none"});theList=a("#the-comment-list").wpList({alt:"",delBefore:i,dimAfter:g,delAfter:k,addColor:"none"})};commentReply={init:function(){var b=a("#replyrow");a("a.cancel",b).click(function(){return commentReply.revert()});a("a.save",b).click(function(){return commentReply.send()});a("input#author, input#author-email, input#author-url",b).keypress(function(c){if(c.which==13){commentReply.send();c.preventDefault();return false}});a("#the-comment-list .column-comment > p").dblclick(function(){commentReply.toggle(a(this).parent())});a("#doaction, #doaction2, #post-query-submit").click(function(c){if(a("#the-comment-list #replyrow").length>0){commentReply.close()}});this.comments_listing=a('#comments-form > input[name="comment_status"]').val()||""},addEvents:function(b){b.each(function(){a(this).find(".column-comment > p").dblclick(function(){commentReply.toggle(a(this).parent())})})},toggle:function(b){if(a(b).css("display")!="none"){a(b).find("a.vim-q").click()}},revert:function(){if(a("#the-comment-list #replyrow").length<1){return false}a("#replyrow").fadeOut("fast",function(){commentReply.close()});return false},close:function(){a(this.o).fadeIn("fast").css("backgroundColor","");a("#com-reply").append(a("#replyrow"));a("#replycontent").val("");a("#edithead input").val("");a("#replysubmit .error").html("").hide();a("#replysubmit .waiting").hide();if(a.browser.msie){a("#replycontainer, #replycontent").css("height","120px")}else{a("#replycontainer").resizable("destroy").css("height","120px")}},open:function(i,g,c){var e=this,d,b,f;e.close();e.o="#comment-"+i;a("#replyrow td").attr("colspan",a(".widefat thead th:visible").length);d=a("#replyrow"),rowData=a("#inline-"+i);b=e.act=(c=="edit")?"edit-comment":"replyto-comment";a("#action",d).val(b);a("#comment_post_ID",d).val(g);a("#comment_ID",d).val(i);if(c=="edit"){a("#author",d).val(a("div.author",rowData).text());a("#author-email",d).val(a("div.author-email",rowData).text());a("#author-url",d).val(a("div.author-url",rowData).text());a("#status",d).val(a("div.comment_status",rowData).text());a("#replycontent",d).val(a("textarea.comment",rowData).val());a("#edithead, #savebtn",d).show();a("#replyhead, #replybtn",d).hide();f=a(e.o).height();if(f>220){if(a.browser.msie){a("#replycontainer, #replycontent",d).height(f-105)}else{a("#replycontainer",d).height(f-105)}}a(e.o).after(d.hide()).fadeOut("fast",function(){a("#replyrow").fadeIn("fast")})}else{a("#edithead, #savebtn",d).hide();a("#replyhead, #replybtn",d).show();a(e.o).after(d);a("#replyrow").hide().fadeIn("fast")}if(!a.browser.msie){a("#replycontainer").resizable({handles:"s",axis:"y",minHeight:80,stop:function(){a("#replycontainer").width("auto")}})}setTimeout(function(){var l,j,m,h,k;l=a("#replyrow").offset().top;j=l+a("#replyrow").height();m=window.pageYOffset||document.documentElement.scrollTop;h=document.documentElement.clientHeight||self.innerHeight||0;k=m+h;if(k-20<j){window.scroll(0,j-h+35)}else{if(l-20<m){window.scroll(0,l-35)}}a("#replycontent").focus().keyup(function(n){if(n.which==27){commentReply.revert()}})},600);return false},send:function(){var b={};a("#replysubmit .waiting").show();a("#replyrow input").each(function(){b[a(this).attr("name")]=a(this).val()});b.content=a("#replycontent").val();b.id=b.comment_post_ID;b.comments_listing=this.comments_listing;a.ajax({type:"POST",url:wpListL10n.url,data:b,success:function(c){commentReply.show(c)},error:function(c){commentReply.error(c)}});return false},show:function(b){var e,g,f,d;if(typeof(b)=="string"){this.error({responseText:b});return false}e=wpAjax.parseAjaxResponse(b);if(e.errors){this.error({responseText:wpAjax.broken});return false}if("edit-comment"==this.act){a(this.o).remove()}e=e.responses[0];g=e.data;a(g).hide();a("#replyrow").after(g);this.o=f="#comment-"+e.id;this.revert();this.addEvents(a(f));d=a(f).hasClass("unapproved")?"#ffffe0":"#fff";a(f).animate({backgroundColor:"#CCEEBB"},600).animate({backgroundColor:d},600);a.fn.wpList.process(a(f))},error:function(b){var c=b.statusText;a("#replysubmit .waiting").hide();if(b.responseText){c=b.responseText.replace(/<.[^<>]*?>/g,"")}if(c){a("#replysubmit .error").html(c).show()}}};a(document).ready(function(){var e,b,c,d;setCommentsList();commentReply.init();a("span.delete a.delete").click(function(){return false});if(typeof QTags!="undefined"){ed_reply=new QTags("ed_reply","replycontent","replycontainer","more")}if(typeof a.table_hotkeys!="undefined"){e=function(f){return function(){var h,g;h="next"==f?"first":"last";g=a("."+f+".page-numbers");if(g.length){window.location=g[0].href.replace(/\&hotkeys_highlight_(first|last)=1/g,"")+"&hotkeys_highlight_"+h+"=1"}}};b=function(g,f){window.location=a("span.edit a",f).attr("href")};c=function(){toggleWithKeyboard=true;a("input:checkbox","#cb").click().attr("checked","");toggleWithKeyboard=false};d=function(f){return function(){var g=a('select[name="action"]');a("option[value="+f+"]",g).attr("selected","selected");a("#comments-form").submit()}};a.table_hotkeys(a("table.widefat"),["a","u","s","d","r","q","z",["e",b],["shift+x",c],["shift+a",d("approve")],["shift+s",d("markspam")],["shift+d",d("delete")],["shift+t",d("trash")],["shift+z",d("untrash")],["shift+u",d("unapprove")]],{highlight_first:adminCommentsL10n.hotkeys_highlight_first,highlight_last:adminCommentsL10n.hotkeys_highlight_last,prev_page_link_cb:e("prev"),next_page_link_cb:e("next")})}})})(jQuery);