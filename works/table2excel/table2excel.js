/*
 *  jQuery table2excel - v1.1.1
 *  jQuery plugin to export an .xls file in browser from an HTML table
 *  https://github.com/rainabba/jquery-table2excel
 *
 *  Made by rainabba
 *  Under MIT License
 */

!function (x, m, d, e) {
  var n = "table2excel",
    a = {
      exclude: ".noExl",
      name: "Table2Excel",
      filename: "table2excel",
      fileext: ".xls",
      exclude_img: !0,
      exclude_links: !0,
      exclude_inputs: !0
    };

  function l(e, t) {
    this.element = e, this.settings = x.extend({}, a, t), this._defaults = a, this._name = n, this.init()
  }

  function h(e) {
    return e.filename ? e.filename : "table2excel"
  }
  l.prototype = {
    init: function () {
      var s = this;
      s.template = {
        head: '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>',
        sheet: {
          head: "<x:ExcelWorksheet><x:Name>",
          tail: "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"
        },
        mid: "</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body>",
        table: {
          head: "<table>",
          tail: "</table>"
        },
        foot: "</body></html>"
      }, s.tableRows = [], x(s.element).each(function (e, t) {
        var n, a, l = "";
        x(t).find("tr").not(s.settings.exclude).each(function (e, t) {
          l += "<tr>", x(t).find("td,th").not(s.settings.exclude).each(function (e, t) {
            var n = x(this).attr("rowspan"),
              a = x(this).attr("colspan");
            0 < x(t).find(s.settings.exclude).length ? l += "<td> </td>" : (l += "<td", 0 < n && (l += " rowspan='" + n + "' "), 0 < a && (l += " colspan='" + a + "' "), l += "/>" + x(t).html() + "</td>")
          }), l += "</tr>"
        }), s.settings.exclude_img && (n = /(\s+alt\s*=\s*"([^"]*)"|\s+alt\s*=\s*'([^']*)')/i, l = l.replace(/<img[^>]*>/gi, function (e) {
          var t = n.exec(e);
          return null !== t && 2 <= t.length ? t[2] : ""
        })), s.settings.exclude_links && (l = l.replace(/<a[^>]*>|<\/a>/gi, "")), s.settings.exclude_inputs && (a = /(\s+value\s*=\s*"([^"]*)"|\s+value\s*=\s*'([^']*)')/i, l = l.replace(/<input[^>]*>|<\/input>/gi, function (e) {
          var t = a.exec(e);
          return null !== t && 2 <= t.length ? t[2] : ""
        })), s.tableRows.push(l)
      }), s.tableToExcel(s.tableRows, s.settings.name, s.settings.sheetName)
    },
    tableToExcel: function (e, t, n) {
      var a, l, s, i = this,
        o = "";
      for (a in i.format = function (e, n) {
          return e.replace(/{(\w+)}/g, function (e, t) {
            return n[t]
          })
        }, n = void 0 === n ? "Sheet" : n, i.ctx = {
          worksheet: t || "Worksheet",
          table: e,
          sheetName: n
        }, o = i.template.head, x.isArray(e) && Object.keys(e).forEach(function (e) {
          o += i.template.sheet.head + n + e + i.template.sheet.tail
        }), o += i.template.mid, x.isArray(e) && Object.keys(e).forEach(function (e) {
          o += i.template.table.head + "{table" + e + "}" + i.template.table.tail
        }), o += i.template.foot, e) i.ctx["table" + a] = e[a];
      if (delete i.ctx.table, !!d.documentMode)
        if ("undefined" != typeof Blob) {
          o = [o = i.format(o, i.ctx)];
          var c = new Blob(o, {
            type: "text/html"
          });
          m.navigator.msSaveBlob(c, h(i.settings))
        } else txtArea1.document.open("text/html", "replace"), txtArea1.document.write(i.format(o, i.ctx)), txtArea1.document.close(), txtArea1.focus(), sa = txtArea1.document.execCommand("SaveAs", !0, h(i.settings));
      else {
        var r = new Blob([i.format(o, i.ctx)], {
          type: "application/vnd.ms-excel"
        });
        m.URL = m.URL || m.webkitURL, l = m.URL.createObjectURL(r), (s = d.createElement("a")).download = h(i.settings), s.href = l, d.body.appendChild(s), s.click(), d.body.removeChild(s)
      }
      return !0
    }
  }, x.fn[n] = function (e) {
    var t = this;
    return t.each(function () {
      x.data(t, "plugin_" + n) || x.data(t, "plugin_" + n, new l(this, e))
    }), t
  }
}(jQuery, window, document);