const cableData = [
    { distance: 100, connector: 'RJ45', standard: '10Base-T', type: 'Par trançado (CAT3 ou superior)', maxDistance: '100 m', speed: '10 Mbps' },
    { distance: 100, connector: 'RJ45', standard: '10Base-T', type: 'Par trançado (CAT5 ou superior)', maxDistance: '100 m', speed: '10 Mbps' },
    {distance:100,	connector:'RJ45', standard:'100Base-TX',	type:'Par trançado (CAT5e ou superior)',	maxDistance:'100m',	speed:'100 Mbps'},
    {distance:100,	connector:'RJ45', standard:'1000Base-T',	type:'Par trançado (CAT6a ou superior)',	maxDistance:'100m',	speed:'1 Gbps'},
    {distance:100,	connector:'RJ45', standard:'10GBase-T',	type:'Fibra: Multimodo',	maxDistance:'100m',	speed:'10 Gbps'},
    {distance:2000,	connector:'RJ45', standard:'100Base-FX',	type:'Fibra: Multimodo',	maxDistance:'2000m',	speed:'100 Mbps'},
    {distance:550,	connector:'RJ45', standard:'1000Base-SX',	type:'Fibra: Monomodo',	maxDistance:'550m',	speed:'1 Gbps'},
    {distance:10000 (mono),	connector:'RJ45',standard:'1000Base-LX',	type:'Fibra: Multimodo',	maxDistance:'10000 (mono)',	speed:'1 Gbps'},
    {distance:550 (multi),	connector:'RJ45', standard:'1000Base-LX',	type:'Fibra: Multimodo',	maxDistance:'550 (multi)',	speed:'1 Gbps'},
    {distance:300,		connector:'RJ45', standard:'10GBase-SR',	type:'Fibra: Multimodo',	maxDistance:'300m',	speed:'10 Gbps'},
    {distance:10000,		connector:'RJ45', standard:'10GBase-LR',	type:'Fibra: Multimodo',	maxDistance:'10000m',	speed:'10 Gbps'},
    {distance:150,		connector:'RJ45', standard:'40GBase-SR4',	type:'Fibra: Multimodo',	maxDistance:'150m',	speed:'40 Gbps'},
    {distance:100,		connector:'RJ45', standard:'100GBase-SR10',	type:'Fibra: Multimodo',	maxDistance:'100m',	speed:'100 Gbps'},
    {distance:10000,		connector:'RJ45', standard:'400GBASE-R',	type:'Fibra: Multimodo',	maxDistance:'10000m',	speed:'400 Gbps'},
    {distance:10000,		connector:'RJ45', standard:'40GBase-LR4',	type:'Fibra: Multimodo',	maxDistance:'10000m',	speed:'40 Gbps'},
    {distance:10000,	connector:'RJ45', standard:'100GBase-LR4',	type:'Fibra: Multimodo',	maxDistance:'10000m',	speed:'100 Gbps'},
    { distance: 40000, connector: 'LC', standard: '10GBase-ER', type: 'Fibra: Monomodo', maxDistance: '40 km', speed: '10 Gbps' }
];

document.getElementById('distance').addEventListener('change', function() {
    const distance = parseInt(this.value);
    const connectorSelect = document.getElementById('connector');
    connectorSelect.innerHTML = '<option value="">--Selecione o Conector--</option>';

    if (!isNaN(distance)) {
        const connectors = [...new Set(cableData.filter(cable => cable.distance === distance).map(cable => cable.connector))];
        connectors.forEach(connector => {
            const option = document.createElement('option');
            option.value = connector;
            option.textContent = connector;
            connectorSelect.appendChild(option);
        });

        connectorSelect.disabled = false;
    } else {
        connectorSelect.disabled = true;
    }

    updateTable([]);
});

document.getElementById('connector').addEventListener('change', function() {
    const distance = parseInt(document.getElementById('distance').value);
    const connector = this.value;

    if (!isNaN(distance) && connector) {
        const filteredCables = cableData.filter(cable => cable.distance === distance && cable.connector === connector);
        updateTable(filteredCables);
    } else {
        updateTable([]);
    }
});

function updateTable(cables) {
    const tbody = document.getElementById('resultsTable').querySelector('tbody');
    tbody.innerHTML = '';

    cables.forEach(cable => {
        const row = document.createElement('tr');
        Object.values(cable).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}
