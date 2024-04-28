//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page
This file handle:
    - Main Screen HTML Element
    - Main Menu HTML Element

*/
//=====================================================================\\
//================================================================\\
//=========================== Main Screen ========================\\
//================================================================\\
const MainScreen = {};
MainScreen.TagTemplate = function (id, tag, mode = 0) {
	if (mode == 0) {
		return (
			`
        <div id="` +
			id +
			`" class="rounded-md text-center min-w-12 font-base text-xs border-none dark:text-white shadow-lg cursor-pointer">` +
			tag.title +
			`</div>                
        `
		);
	}
};

MainScreen.TaskTemplate = function (id, task, mode = 0) {
	if (mode == 0) {
		return (
			` 

        <div id="` +
			id +
			`" class="task-outer bg-main dark:bg-dark/50 rounded-xl cursor-default">
        <div class=" rounded-lg shadow-lg">

            <div class=" px-2 py-1 flex justify-between items-center border-b-[2px]">

                <div class="font-semibold text-lg lg:text-xl truncate w-full dark:text-white ">` +
			task.title +
			`</div>


                <div class="flex items-center gap-2">
                    <div class="Task-Edit mx-1 cursor-pointer">
                        <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg>
                    </div>


                    <div id="Task-Cancel"
                        class="bg-red-500 rounded-full shadow-lg h-4 w-4 lg:h-6 lg:w-6 font-bold cursor-pointer"></div>
                </div>
            </div>

            <div class="p-2 flex items-center h-fit">

                <p class="h-full w-full text-left p-2 font-base truncate lg:text-xl dark:text-white">` +
			task.description +
			`</p>

                <input id="Task-Destroyer" type="checkbox"
                    class="bg-primary-200 rounded-xl shadow-lg h-4 w-4 font-bold border-none cursor-pointer"></input>
            </div>
            <div id="Task-Tag" class="p-2 flex gap-2 overflow-hidden">
            
            </div>
        </div>

    </div>
`
		);
	} else if (mode == 1) {
		return (
			`
            <div id="` +
			id +
			`" class="task-outer">
                <div class=" rounded-lg h-20 lg:h-32 border-2 border-slate-700 ">
                    <div class=" px-2 flex justify-between items-center border-b-2 border-slate-700">
                        <div class="font-bold text-xl lg:text-2xl">` +
			task.title +
			`</div>
                        <div id="Task-Cancel" class="bg-red-500 rounded-full h-4 w-4 font-bold cursor-pointer"></div>
                    </div>
                    <div class="p-2 flex justify-between items-center lg:h-24">
                        <div class="text-center lg:text-xl">` +
			task.description +
			`</div>
                        <input id="Task-Destroyer" type="checkbox" class="bg-primary-200 rounded-xl h-4 w-4 font-bold border-none cursor-pointer"></input>
                    </div>

                </div>

            </div>
            `
		);
	}
};

MainScreen.GroupTemplate = function (id, group, mode = 0) {
	if (mode == 0) {
		return (
			`
    <div id="` +
			id +
			`" class="group-outer">
        <div class="flex justify-between items-center px-3 ">
        <div id="Task-Group-Title" class="todobox-title lg:text-2xl dark:text-white">` +
			group.title +
			`</div>
        <div class="Group-Task-Add ">
                <svg class="w-6 lg:w-7 h-6 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </div>
        </div>
        <div id="Task-Section-Outer" class= "bg-main/55 dark:bg-gray-700/80 transition-all duration-300 ease-in-out border-t-8 pt-4 p-2 overflow-hidden shadow-xl hover:shadow-2xl rounded-xl ">
            <div id="Task-Section" class="relative px-2 pb-9 flex flex-col gap-3 overflow-y-auto overflow-x-hidden rounded-xl w-72 h-72 lg:w-96 lg:h-96">
            <!--task here-->
            </div>
        </div>
    </div>
    
    `
		);
	} else if (mode == 1) {
		return (
			`
    <!-- Item  -->

    <div id="` +
			id +
			`" data-carousel-item class="flex flex-col items-center overflow-x-hidden ease-in-out duration-700 z-0">
        <div id="Task-Group-Title" class="text-center">` +
			group.title +
			`</div>
        <div id="" class="Task-Section border-primary-100 w-80 h-96 border-2" >
        <!-- Contents -->
        
        </div>
    </div>
    `
		);
	}
};

MainScreen.FormatterTemplate = function (mode = 0) {
	if (mode == 0) {
		return `
    <div id="Main-Formatter" class="relative w-full">
        <div id="Wrapper" class="relative flex flex-wrap justify-center items-center gap-8 py-10 lg:px-36">
        <!--Group-->
        </div>
    </div>
    `;
	} else if (mode == 1) {
		return `
        <!-- Main List -->
        <div id="Main-Formatter" class="relative w-full bg-red-300" data-carousel="static">
        <!-- Carousel wrapper -->
        <div id="Wrapper" class="relative h-96 mt-[3vh] overflow-hidden">


        </div>
    </div>`;
	}
};



//================================================================\\
//=========================== Main Menu ==========================\\
//================================================================\\

const MainMenu = {};
MainMenu.TagTempplate = function (id, tag) {
	return (
		`
    
    <div id="` +
		id +
		`" class="MMenu-Tag flex items-center pl-8 cursor-pointer">
    <div class="h-full">
        <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z" />
        </svg>
    </div>

    <div id="MMenu-Tag-Title" class="text-lg px-1 my-1 center dark:text-white">` +
		tag.title +
		`</div>
    <div class="MMenu-Tag-Edit mx-1">
    <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
</svg>
</div>
</div>

`
	);
};

MainMenu.GroupTemplates = function (id, group) {
	return (
		`
    <div id="` +
		id +
		`" class="MMenu-Group"><!--block-->
    <!-- Greeting div, status centered -->
        <div class="flex justify-between items-center pl-3 pr-1">

            <div class="MMenu-Toggle-Hidden flex items-center w-full">
            <div class="MMenu-Dropdown-Arrow">
            <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9-7 7-7-7"/>
            </svg>          
            </div>

                <div id="MMenu-Group-Title" class="text-xl ml-2 dark:text-white">` +
		group.title +
		`</div>
        </div>

        <div class="MMenu-Group-Edit mx-1">
        <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
        </svg>

        </div>
        <div class="MMenu-Tag-Add">
            <svg class="w-5 lg:w-7 h-5 lg:h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M5 12h14m-7 7V5" />
            </svg>
        </div>
    </div>
    <div id="MMenu-Tag-Section" class="">
        <!--tag-->
    </div>
</div><!--eoblock-->`
	);
};


//================================================================\\
//=========================== Export  ============================\\
//================================================================\\

export { MainScreen, MainMenu };
