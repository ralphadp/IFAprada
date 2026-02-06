import {jsPDF} from 'jspdf';
import {applyPlugin} from 'jspdf-autotable'; // Important: this import adds the autoTable method to jsPDF

import './exportToPdf.css'

const exportToPdf = (columns, data, title) => {
	applyPlugin(jsPDF);
	
	  const unit = "pt";
	  const size = "A4"; // Use A1, A2, A3 or A4
	  const orientation = "portrait"; // portrait or landscape
	  const marginLeft = 30;
	  
	  const doc = new jsPDF(orientation, unit, size);

	  doc.setFontSize(12);
	  doc.text(title, marginLeft, 30);

	  // Map your table columns and data to the format jspdf-autotable expects
	  const headers = [columns.map(col => col.name)]; // Assuming columns have a 'name' property
	  const body = data.map(row => [
		  row.hora, 
		  row.curso, 
		  row.lunes.materia + '\n' + row.lunes.profesor + '\n' + row.lunes.aula, 
		  row.martes.materia + '\n' + row.martes.profesor + '\n' + row.martes.aula,
		  row.miercoles.materia + '\n' + row.miercoles.profesor + '\n' + row.miercoles.aula,
		  row.jueves.materia + '\n' + row.jueves.profesor + '\n' + row.jueves.aula,
		  row.viernes.materia + '\n' + row.viernes.profesor + '\n' + row.viernes.aula
	  ]);
//cellWidth: 'auto'|'wrap'|number = 'auto'
	  let content = {
		startY: 50,
		styles: { fontSize: 6, halign: 'center' },
		//columnStyles: { hora: { cellWidth: 40 }, curso: { cellWidth: 40 }, lunes: { cellWidth: 60 }, martes: { cellWidth: 60 }, miercoles: { cellWidth: 70 }, jueves: { cellWidth: 70 }, viernes: { cellWidth: 70 }},
		head: headers,
		body: body
	  };

	  console.log("contents:", content);
	  
	  doc.autoTable(content);
	  const s = doc.save((title?title:'horarios-2026') + '.pdf');
	  
	  console.log("result:", s);
};

export default exportToPdf;
