(function toDoList() {
    const input = document.querySelector(".new-task");
    const button = document.querySelector(".btn-add-task");
    const ulList = document.querySelector(".tasks");

    const createLiElement = () => {
        const li = document.createElement("li");
        return li;
    };

    input.addEventListener("keypress", e => {
        if (e.keyCode === 13) {
            if (!input.value) return;
            createTask(input.value);
        };
    });

    const createClearButton = li => {
        li.innerText += " ";
        const clearButton = document.createElement("button");
        clearButton.innerText = "Clear";
        clearButton.setAttribute("class", "clear");
        li.appendChild(clearButton);
    };

    const createTask = task => {
        const li = createLiElement();
        li.innerText = task;
        ulList.appendChild(li);
        clearInput();
        createClearButton(li);
        saveTask();
    };

    const clearInput = () => {
        input.value = "";
        input.focus();
    };

    button.addEventListener("click", () => {
        if (!input.value) return;
        createTask(input.value);
        clearInput();
    });

    document.addEventListener("click", e => {
        const element = e.target;
        if (element.classList.contains("clear")) {
            element.parentElement.remove();
            input.focus();
            saveTask();
        };
    });

    const saveTask = () => {
        const liTasks = ulList.querySelectorAll("li");
        const tasksList = [];

        for (let task of liTasks) {
            let textTask = task.innerText;
            textTask = textTask.replace("Clear", "").trim();
            tasksList.push(textTask);
        };

        const tasksJSON = JSON.stringify(tasksList); // transforming an array in string
        localStorage.setItem("Tasks", tasksJSON);   // first parameter contains the recovery name
    };

    (function addSaveTask() {
        const tasks = localStorage.getItem("Tasks");
        const tasksList = JSON.parse(tasks);

        for (let task of tasksList) {
            createTask(task);
        };
    })();
})();