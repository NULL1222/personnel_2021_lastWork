<template>
   <div style="float:right;padding-left:5px;">
     <Dropdown @on-click="btnExport" placement="bottom-start">
      <Button type="primary">导出
         <Icon type="ios-arrow-down"></Icon>
       </Button>
       <DropdownMenu slot="list">
         <template v-for="(item,index) in exportList" >
           <DropdownItem :key="`${_uid}_${index}`" :name="item.ExportID">{{ item.ExportName }}</DropdownItem>
         </template>
       </DropdownMenu>
     </Dropdown>
  </div>
 </template>
 <script>
 import json2csv from "json2csv";
 import excel from "../../Common/libs/excel";
 export default {
   data() {
     return {
       exportList: [
         {
           ExportName: "1-导出Excel",
           ExportID: "Excel"
         },
         {
           ExportName: "2-导出Csv",
           ExportID: "Csv"
         },
         {
           ExportName: "3-导出Pdf",
           ExportID: "Pdf"
         }
       ]
     };
   },
   props: {
     exportData: {
       type: Array,
       default: []
     },
     isPagination: {
       type: Boolean,
      default: false
     },
     exportColumns: {
       type: Array,
       default: []
     },
     exportFileName: {
       type: String,
       default: ""
     }
   },
   watch: {},
   computed: {},
   mounted() {
     // this.getRPTExportType() 初始化导出类型
   },
   methods: {
     // 下拉菜单改变时事件
    handleExportTypeChange(param) {
       // change 事件改变的时候提交给父组建 参数 value
       this.$emit("myHandleExportTypeChange", param);
     },
     // 判断是否IE浏览器
     MyBrowserIsIE() {
       let isIE = false;
      if (
         navigator.userAgent.indexOf("compatible") > -1 &&
         navigator.userAgent.indexOf("MSIE") > -1
       ) {
         // ie浏览器
         isIE = true;
       }
       if (navigator.userAgent.indexOf("Trident") > -1) {
         // edge 浏览器
         isIE = true;
       }
       return isIE;
     },
     //创建a标签下载
     createDownLoadClick(content, fileName) {
       const link = document.createElement("a");
       link.href = encodeURI(content);
       link.download = fileName;
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
     },
     btnExport(fileType) {
       debugger;
      // 如果是分页的
       if (this.isPagination == true) {
         // 向父组件提交一个需要重新传数据的方法 类型name
         this.$emit("myHandleRepeatExprot", fileType);
       } else {
         // 不分页直接导出
         this.exportFile(fileType);
       }
     },
     exportFile(fileType) {
       if (this.exportData.length == 0) {
         this.$Message.error("不允许导出空表格");
         return false;
       }
       // 循环数组
       this.exportData.forEach((item, index) => {
         let temp = {};
         // 循环数组中的对象 当传入数据为undefined的时候 赋空
         Object.keys(item).forEach(function(key) {
           if (item[key] == undefined) {
             item[key] == " ";
             temp[key] = "";
           } else {
             temp[key] = item[key];
          }
         });
         this.exportData[index] = temp;
       });
       let titles = []; // 导出内容的中文标题
       let keys = []; // 导出内容的英文标题
       this.exportColumns.forEach((item, index) => {
         if (item.key != "handle") {
           // 操作列定义为 handle
           titles.push(item.title);
           keys.push(item.key);
         }
       });
       if (fileType == "Excel") {
        const param = {
           title: titles,
          key: keys,
           data: this.exportData,
           autoWidth: true,
           filename: this.exportFileName
         };
         excel.export_array_to_excel(param);
       } else if (fileType == "Csv") {
         this.exportCsv(
           this.exportData,
           this.exportColumns,
           keys,
           this.exportFileName
         );
       } else {
         // 导出pdf
         let tempArray = [];
         let labels = titles.join(","); // title拼接成一个字符串
         let keys2 = keys.join(","); // 拼接字符串
         let row0 = this.exportData[0]; //导出数组内容的第一行
         var rowKeys = [];
         for (var p1 in row0) {
           // 数组
           if (row0.hasOwnProperty(p1)) {
             rowKeys.push(p1); // table内容的 key
           }
         }
         // keys 和 table的第一列的key比较 取table中不存在的列 为了赋空值
         var diffArray = keys.filter(key => !rowKeys.includes(key));
 
         let tableData = [];
         // 循环数组
         this.exportData.forEach((rowItem, index) => {
           let temp = rowItem;
           diffArray.forEach((keyItem, index) => {
             temp[keyItem] = " ";
           });
           tableData.push(temp);
         });
         this.exportPdfFile(keys2, labels, tableData);
       }
     },
     // row data里面的每一个对象 keys 传入的需要导出列数组
     // 筛选 需要导出的数据内容
     /// 例如  keys ["Ordinal","Code"] row 有{Ordinal:1,Code:2,Name:3} 返回新对象{Ordinal:1,Code:2}
     getRow(row, keys) {
       let obj = {};
       keys.forEach(col => {
         debugger;
         let val = row[col];
         obj[col] = val;
       });
       return obj;
     },
     exportCsv(data, columns, keys, fileName) {
       //导出的数据行集合
       const rows = data.map(t => this.getRow(t, keys));
       //导出的数据列标题
       var fields = [];
       columns.forEach(t => {
         if (t.key != "handle") {
           // 操作列定义为handle
           let temp = {
             value: t.key,
             label: t.title
           };
           fields.push(temp);
         }
       });
       try {
         const result = json2csv.parse(rows, {
           fields: fields,
           excelStrings: true
         });
         if (this.MyBrowserIsIE()) {
           // IE10以及Edge浏览器
           var BOM = "\uFEFF";
           var csvData = new Blob([BOM + result], { type: "text/csv" });
           navigator.msSaveBlob(csvData, `${fileName}.csv`);
         } else {
           let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + result;
           // 非ie 浏览器
           this.createDownLoadClick(csvContent, `${fileName}.csv`);
         }
       } catch (err) {
         alert(err);
       }
     },
     exportPdfFile(valueKeys, labeNames, tableData) {
       let rexportPdfFile = {
         ExCode: "DownLoadFile",
         fileName: this.exportFileName,
         access_token: this.$cookies.get("access_token"),
         valueKeys: valueKeys, // 例如 "Product,Version,Description",
         labeNames: labeNames, // 例如 "产品,版本,描述",
         tableData: tableData
       };
       //思路 webapi返回二进制的文件流 js 通过Blob接收并转换成pdf文件下载
       this.$axios({
         method: "post",
         Prefix: "",
         data: {
           ExCode: "IRAP_RPT_DownLoadFile",
           fileName: this.exportFileName,
           access_token: this.$cookies.get("access_token"),
           valueKeys: valueKeys, //"Product,Version,Description",
           labeNames: labeNames, // "产品,版本,描述",
           tableData: tableData
         }
         // responseType:'blob'
       })
         .then(response => {
           // base64字符串转 byte[]
           var bstr = atob(response.data.FileInfo),
             n = bstr.length,
             u8arr = new Uint8Array(n);
           while (n--) {
             u8arr[n] = bstr.charCodeAt(n);
           }
           // 转blob
           var blob = new Blob([u8arr], {
             type: `application/pdf;charset-UTF-8`
           });
 
           if (this.MyBrowserIsIE()) {
             // IE10以及Edge浏览器
             var BOM = "\uFEFF";
             // 传入 Blob 对象
             navigator.msSaveBlob(blob, `${this.exportFileName}.pdf`);
           } else {
             // 非ie 浏览器
             let content = window.URL.createObjectURL(blob);
             this.createDownLoadClick(content, `${this.exportFileName}.pdf`);
           }
         })
         .catch(err => {
           console.log(err);
         });
     },
     getRPTExportType() {
       this.$axios({
         method: "post",
         Prefix: "",
         data: {
           ExCode: "IRAP_RPT_ExportType",
           access_token: this.$cookies.get("access_token")
         }
       }).then(response => {
           if (response.data.ErrCode == 0) {
             this.exportList = response.data.Rows
           } else {
             this.$Message.error(response.data.ErrText)
           }
         })
         .catch(err => {
           console.log(err);
         });
     }
  }
 };
</script>
