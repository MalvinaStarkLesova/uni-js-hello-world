console.log('***********************');
console.log('*Органайзър за събития*');
console.log('***********************');

console.log('1. Изведи всички събития: showEvents();');
console.log('	- Изведи всички събития с уникален идентификатор: showEventsWithId();');
console.log('2. Изтрий събитие по уникален идентификатор: deleteEvent(id);');
console.log("3. Създай събитие: createNewEvent('name', 'flag');");
console.log('4. Актуализирай събитие: updateEvent(id);');
console.log("5. Добави клиент към събитие: addClient(eventId, 'name', 'gender', age);");
console.log("6. Визуализирай клиенти от събитие: showClients(eventId, 'gender');");
console.log("7. Изтрий клиент от събитие: deleteClient(eventId, 'clientName');");

var events = [];
var clients = [];

function createNewEvent(name, flag){
	if (!name) {
		return console.log("Въведете име на събитието! Пример: createNewEvent('Име на събитие', '18-');");
	}
	else{
		let id = 0;

		if (events.length) {
			for (let i = 0; i < events.length; i++){
			id = events[i].id + 1;
			}
		}

		if (!flag) {
		flag = '18-';
		}

		var event = {
			id: id,
			name: name,
			flag: flag
		}

		events.push(event);
	}
}

function showEvents(){
	if (events.length > 0) {
		for (let i = 0; i < events.length; i++){
		let currentEvent = events[i];

		console.log(currentEvent.name + ' : ' + currentEvent.flag);
		console.log('***********************');
		}
	}
	else{
		return console.log('Няма създадени евенти.');
	}
}

function showEventsWithId(){
	if (events.length > 0) {
		for (let i = 0; i < events.length; i++){
		let currentEvent = events[i];

		console.log('Уникален идентификатор: ' +  currentEvent.id);
		console.log(currentEvent.name + ' : ' + currentEvent.flag);
		console.log('***********************');
		}
	}
	else{
		return console.log('Няма създадени евенти.');
	}
}

function deleteEvent(id){
	let index = events.findIndex(x => x.id==id);
	if (index > -1) {
		events.splice(index,1);
		console.log('Успешно изтрихте евент с уникален идентификатор: ' + index);
	}
	else{
		console.log('Няма евент с въведеният идентификатор.');
	}
}

function updateEvent(id, newName, newFlag){
	var eventExist = false;

	for (let i = 0; i < events.length; i++){
		if (events[i].id == id) {
			eventExist = true;
			break;
		}
	}

	if (!eventExist) {
		return console.log('Въведеният идентификатор е невалиден или няма евент с такъв идентификатор.');
	}
	else{
		if (!newName) {
			return console.log("Въведете име на събитието! Пример: updateEvent(3, 'Име на събитие', '18-');");
		}
		else{

			if (!newFlag) {
			newFlag = '18-';
			}

			let index = events.findIndex(x => x.id==id);

			for (let i = 0; i < events.length; i++){
				if (i == index) {
					let updateEvent = events[i];

					updateEvent.name = newName;
					updateEvent.flag = newFlag;
				}
			}
		}
	}
	return console.log('Успешно актуализрахте събитието с идентификатор ' + id);
}

function addClient(eventId, name, gender, age){
	if (!events.length > 0) {
    return console.log('Няма създадени евенти.');
  }

  let client = {
		eventId: eventId,
		name: name,
		gender: gender,
		age: age
	}

	let index = events.findIndex(x => x.id==eventId);

	let eventFlag;

	for (let i = 0; i < events.length; i++){
		if (i == index) {
			eventFlag = events[i].flag;
		}
	}

	if (eventFlag == '18+' && age < 18) {
		return console.log('Клиентът не е пълнолетен, събитието е за лица над 18 години.');
	}
	else{
		clients.push(client);
	}
}

function showClients(eventId, gender){
  
  if (clients.length == 0) {
    return console.log('Няма добавени клиенти.');
  }

  let genderSet = false;

  if (gender) {
    genderSet = true;
  }

	if (events.length > 0) {
		for (let i = 0; i < events.length; i++){
			if (eventId == events[i].id) {
				let currentEvent = events[i];

				console.log('Уникален идентификатор: ' +  currentEvent.id);
				console.log(currentEvent.name + ' : ' + currentEvent.flag);
				console.log('***********************');

				for (let j = 0; j < clients.length; j++){
					if (eventId == clients[j].eventId) {
						let currentClient = clients[j];

            if (genderSet) {
              if (gender == currentClient.gender) {
                console.log(currentClient.name + ' : ' + currentClient.gender + ' : ' + currentClient.age);
                console.log('-----------------------');
              }
            }
            else{
              console.log(currentClient.name + ' : ' + currentClient.gender + ' : ' + currentClient.age);
              console.log('-----------------------');
            }
					}
				}
			}
		}
	}
	else{
		return console.log('Няма създадени евенти.');
	}
}

function deleteClient(eventId, clientName){
  let index = clients.findIndex(x => x.eventId==eventId);
  let client = clients.findIndex(x => x.name==clientName);

  if (index > -1 && clients[index].name == clientName) {
    clients.splice(index,1);
    console.log('Успешно изтрихте клиент от евент: ' + events[index].name);
  }
  else{
    console.log('Няма клиент за този евент или с това име.');
  }
}
