//=====================================================================\\
/* 
NOTICE:
This file handles all the actions that are related to the main content of the page
This file handle:
  - Main content include : group, task, tags
  - CRUD content
  - Render out mainPage content for Today tab

*/
//=====================================================================\\

// Templates 
import { MainScreen, MainMenu } from "./hmtlComponent.js";
import {LoadData, Utils , newGroup, newTask, newTag} from "./userData.js";

$(document).ready(function () { 
  //================================================================\\
  //=========================== Sample var =========================\\
  //================================================================\\
  let isDebugMode = true;
  let Dict = Utils.getSampleData();
  if (!isDebugMode) Dict = Utils.LoadData();
  let currentMode = 0;
  let isMakeChangeGroup = false;
  let currentMMenuTab = 0;  // 0-today 1-cal 2-garden


  /* Main Display rule

        |_MainScreen
        |____Formatter
        |     | id 
        |     |_____title
        |     |
        |     |_____section (Task-Section , Group-Section)
        |     |
        |     |_____tag(Tag-Section)
        |______Addons

  */
  //################################################### Fuctions #########################################################

  //================================================================\\
  //=========================== General ============================\\
  //================================================================\\

  //================================================================\\
  //=========================== Avatar Menu ========================\\
  //================================================================\\
  $("#Avatar-Menu-Click").click(function () {
    $("#Avatar-Menu").toggleClass("h-32 lg:h-44");
    $("#Avatar-Menu-Click").toggleClass("bg-primary-200");
  });

  function toggleProfilePage(Open = false) {
    if (Open) {
      $('#test').load('../static/html/profilePage.html', function () {
        // This callback function will be executed after the content is loaded
        //AJAXLoadUserProfile(); this will be in profile js
        $('#Main-Screen').toggleClass('hidden', Open);
      });
    } else {
      $('#test').empty();
      $('#Main-Screen').toggleClass('hidden', Open);
    }
  }
  let isShowProfile = false;
  $('#PMenu-Profile').click(() => {
    isShowProfile = !isShowProfile;
    toggleProfilePage(isShowProfile);
  });


  //================================================================\\
  //=========================== Mode Menu ==========================\\
  //================================================================\\

  $("#Mode-Menu-Click").click(function () {
    $("#Mode-Menu").toggleClass("h-32 lg:h-44");
    $("#Mode-Menu-Click").toggleClass("bg-main/35");

  });

  $("#PMenu-DarkMode").find("#Toggle-DarkMode").click(function () {
    $("html").toggleClass("dark", $("#Toggle-DarkMode").prop('checked'));
  });
  //================================================================\\
  //=========================== Main Menu ==========================\\
  //================================================================\\

  $("#Main-Menu-Click").click(function () {
    $("#Main-Menu").toggleClass("h-[86vh]");
    $("#Main-Menu-Click").toggleClass("-rotate-90")
  });

  function updateMMenuTabIndicator(tab = null) {
    var $tab = tab ? tab : $("#Main-Menu").find("#MMenu-Today");
    var currId = $tab.attr('id');
    const indiModeCSS = 'border-r-4 border-primary-200 bg-gradient-to-l from-primary-200/35 to-transparent';

    // clear all previous tab border 
    $('#Main-Menu').find('.MMenu-Primary-Section').removeClass(indiModeCSS);
    //console.log(currId);
    const indicatTab = ['MMenu-Today', 'MMenu-Calendar', 'MMenu-Garden'];
    if (indicatTab.indexOf(currId) !== -1) {
      $tab.toggleClass(indiModeCSS);
      if (indicatTab.indexOf(currId) == 0) {
        currentMMenuTab = 0;
        console.log("Today");
        isShowProfile = false;
        toggleProfilePage(isShowProfile);
      }
    }
  }

  $('#Main-Menu').on('click', '.MMenu-Primary-Section', function (e) {
    updateMMenuTabIndicator($(this));
  });

  //Add group
  $("#MMenu-Group-Add").click(function () {
    isMakeChangeGroup = true;
    // Customize modal appearance
    $('#crud-modal label[for="name"]').text("Title");

    $('#crud-modal h3').text("Create Group");
    $('#crud-modal #name').attr('placeholder', 'Group name');;
    $('#crud-modal #name').val('');

    $('#crud-modal #desc-sec').hide();
    $('#crud-modal #tags-sec').hide();
    $('#crud-modal #todo-expired-sec').hide();


    $('#crud-modal button[type="submit"]').html(`
      <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
      Create`);
    $('#crud-modal input[type="checkbox"]').attr("id", `task_`);
    // Show modal
    addGroupnTagModal.show();
  });

  /// Add tag
  $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Add", function () {
    isMakeChangeGroup = false;
    /// add tag
    var gid = $(this).closest(".MMenu-Group").attr("id")
    //console.log(groupDict);
    //addTag(groupDict)
    LoadGroups();

    // Customize modal appearance
    $('#crud-modal label[for="name"]').text("Name");

    $('#crud-modal h3').text("Create Tag");
    $('#crud-modal #name').attr('placeholder', 'Tag name');
    $('#crud-modal #name').val('');

    $('#crud-modal #desc-sec').hide();
    $('#crud-modal #todo-expired-sec').hide();
    $('#crud-modal #tags-sec').hide();
    $('#crud-modal #groups-sec').show();

    $('#crud-modal button[type="submit"]').html(`
    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
    Create`);
    $('#crud-modal input[type="checkbox"]').attr("id", `task_`);
    // Show modal
    addGroupnTagModal.show();

  });


  /// Edit Group
  $("#MMenu-Group-Section").on("click", ".MMenu-Group-Edit", function () {
    console.log($(this).closest(".MMenu-Group").attr("id"));
    var gid = $(this).closest(".MMenu-Group").attr("id");
    var gInfo = Dict.groups[gid];
    isMakeChangeGroup = true;
    $('#crud-modal label[for="name"]').text("Title");

    $('#crud-modal h3').text("Edit Group");
    $('#crud-modal #name').attr('placeholder', 'Group name');;
    $('#crud-modal #name').val(gInfo.title);

    $('#crud-modal #desc-sec').hide();
    $('#crud-modal #tags-sec').hide();
    $('#crud-modal #groups-sec').hide();
    $('#crud-modal #todo-expired-sec').hide();

    $('#crud-modal #colors').val(gInfo.color);

    $('#crud-modal button[type="submit"]').html(`
      <svg class="w-5 lg:w-7 h-5 lg:h-7 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
    </svg> Edit
      `);

    $('#crud-modal #delete-sec').show();

    $('#crud-modal input[type="checkbox"]').attr("id", `group_${gid}`);

    // Show modal
    addGroupnTagModal.show();
  });

  /// Edit Tag
  $("#MMenu-Group-Section").on("click", ".MMenu-Tag-Edit", function () {
    console.log($(this).closest(".MMenu-Tag").attr("id"));
    var tid = $(this).closest(".MMenu-Tag").attr("id")
    var tagInfo = Dict.tags[tid];

    if (tagInfo.editable == false) return;

    isMakeChangeGroup = false;

    // Customize modal appearance
    $('#crud-modal label[for="name"]').text("Name");

    $('#crud-modal h3').text("Edit Tag");
    $('#crud-modal #name').attr('placeholder', 'Tag name');
    $('#crud-modal #name').val(tagInfo.title);

    $('#crud-modal #desc-sec').hide();
    $('#crud-modal #todo-expired-sec').hide();
    $('#crud-modal #tags-sec').hide();
    $('#crud-modal #groups-sec').hide();


    if (tagInfo.deletable == true) {
      $('#crud-modal #delete-sec').show();
    };

    $('#crud-modal button[type="submit"]').html(`
    <svg class="w-5 lg:w-7 h-5 lg:h-7 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
  </svg> Edit
    `);

    $('#crud-modal input[type="checkbox"]').attr("id", `tag_${tid}`);
    // Show modal
    addGroupnTagModal.show();
  });

  function toggleHiddenMMenuGroup(group) {
    group.find("#MMenu-Tag-Section").toggle("hidden");
    group.find(".MMenu-Dropdown-Arrow").toggleClass("-rotate-90");
  }



  function addNewTagMainMenu(group_html, id, tag) {
    //console.log(group_html);
    group_html.append(MainMenu.TagTempplate(id, tag));
    // LoadTags();
  }

  function addNewGroupMainMenu(unique_id, group) {
    $("#MMenu-Group-Section").append(
      MainMenu.GroupTemplates(unique_id, group)
    );

    return $("#" + unique_id);
  }

  function LoadGroups_Tag() {
    //empty all
    $("#MMenu-Group-Section").empty();
    // Iterate over each group in Dict.groups

    for (var groupId in Dict.groups) {
      if (Dict.groups.hasOwnProperty(groupId)) {
        var group = Dict.groups[groupId];
        var g = addNewGroupMainMenu(groupId, group);
        // console.log("Group: " + group.title);
        // Iterate over tags in the current group
        for (var j = 0; j < group.tags.length; j++) {

          if (Dict.tags[group.tags[j]].display == false) continue;

          addNewTagMainMenu(g.find("#MMenu-Tag-Section"), group.tags[j], Dict.tags[group.tags[j]]);
        }
        toggleHiddenMMenuGroup(g);
      }
    }
  }

  //================================================================\\
  //========================== AJAX Zone  ==========================\\
  //================================================================\\

  function AJAXaddGroup(groupId, title, color) {
    // Send AJAX request to backend at /todo/group/create to add group
    $.ajax({
      type: "POST",
      url: "/todo/group/create",
      data: JSON.stringify({ groupId: groupId, title: title, color: color }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Success");
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  function AJAXaddTag(tagId, groupId, title, color) {
    // Send AJAX request to backend at /todo/tag/create to add tag
    $.ajax({
      type: "POST",
      url: "/todo/tag/create",
      data: JSON.stringify({ tagId: tagId, groupId: groupId, title: title, color: color }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Success");
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  function AJAXupdateGroup(groupId, title, color) {
    // Send AJAX request to backend at /todo/group/update to edit group
    $.ajax({
      type: "POST",
      url: "/todo/group/update",
      data: JSON.stringify({ groupId: groupId, title: title, color: color }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Success");
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  function AJAXupdateTag(tagId, groupId, title, color) {
    // Send AJAX request to backend at /todo/tag/update to edit tag
    $.ajax({
      type: "POST",
      url: "/todo/tag/update",
      data: JSON.stringify({ tagId: tagId, groupId: groupId, title: title, color: color }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Success");
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  function AJAXdeleteGroup(groupId) {
    // Send AJAX request to backend at /todo/group/delete to delete group
    $.ajax({
      type: "POST",
      url: "/todo/group/delete",
      data: JSON.stringify({ groupId: groupId }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Success");
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  function AJAXdeleteTag(tagId) {
    // Send AJAX request to backend at /todo/tag/delete to delete tag
    $.ajax({
      type: "POST",
      url: "/todo/tag/delete",
      data: JSON.stringify({ tagId: tagId }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Success");
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  function AJAXcreateTask(taskId, title, description, tag, deadline, points, isCompleted = false) {
    // Send AJAX request to backend at /todo/create to create task
    $.ajax({
      type: "POST",
      url: "/todo/create",
      data: JSON.stringify({
        taskId: taskId, title: title, description: description, tag: tag, deadline: deadline, points: points, isCompleted: isCompleted
      }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Success");
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  function AJAXdeleteTask(taskId) {
    // Send AJAX request to backend at /todo/delete to delete task  
    $.ajax({
      type: "POST",
      url: "/todo/delete",
      data: JSON.stringify({ taskId: taskId }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Success");
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  function AJAXcompleteTask(taskId) {
    // Send AJAX request to backend at /todo/completed/<id> to mark task as completed
    $.ajax({
      type: "POST",
      url: "/todo/completed/" + taskId,
      data: JSON.stringify({ taskId: taskId, isCompleted: true }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Success");
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  function AJAXupdateTask(taskId, title, description, tag, deadline, points, isCompleted = false) {
    // Send AJAX request to backend at /todo/update to update task
    $.ajax({
      type: "POST",
      url: "/todo/update",
      data: JSON.stringify({
        taskId: taskId, title: title, description: description, tag: tag, deadline: deadline, points: points, isCompleted: isCompleted
      }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Success");
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }
  /// load user group
  function AJAXLoadGroup() {
    // Send AJAX request to backend at /todo/update to update task
    $.ajax({
      type: "GET",
      url: "/todo/group/get",
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        console.log("Loading userdata");
        let tempDict = {};
        data.forEach((dt) => {
          let tmp = {
            title: dt[1],
            tags: [dt[2]],
            def_tag: dt[0],
            color: dt[3],
            current_html: "",
          };

          if (!Dict.tags.hasOwnProperty(tmp.def_tag)) { // add def_tag
            Dict.tags[tmp.def_tag] = {
              title: "Default",
              color: "#000000",
              display: false,
              editable: false,
              deletable: false,
            }
          }

          tmp.tags.forEach((t, i) => { // add other tags
            if (!Dict.tags.hasOwnProperty(t)) {
              Dict.tags[t] = {
                title: "no_name_" + tmp.title + "_" + i, // Adding index to title
                color: randHexColor(),
                display: true,
                editable: true,
                deletable: true,
              };
            }
          });


          Dict.groups[dt[0]] = tmp;
          //tempDict.groups[dt[0]] = tmp;
        });

        console.log(Dict);
        console.log("Load data complete")
        RefreshMainScreen();
        LoadGroups_Tag();
      },
      error: function (data) {
        console.log("Error");
      }
    });
  }

  //================================================================\\
  //========================== Main Screen =========================\\
  //================================================================\\

  function updateTime() {
    const now = new Date();
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    let hours = now.getHours().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('clock').textContent = formattedTime;
  }

  setInterval(updateTime, 1000);

  function renderTagMainScreen(tag_html, tag, id, mode = 0) {
    //console.log(tag.display);
    if (tag.display == false) return;
    tag_html.append(MainScreen.TagTemplate(id, tag, mode));
    tag_html.find("#" + id).css({ "background-color": tag.color });
  }


  function renderFormatterAddons(formatter_html, mode = 0) {
    formatter_html.append(FormmatterAddons(mode));
  }

  function renderTaskMainScreen(task_html, task, id, mode = 0) {
    task_html.append(MainScreen.TaskTemplate(id, task, mode));
    renderTagMainScreen(task_html.find("#" + id).find("#Task-Tag"), Dict.tags[task.tag], task.tag);
  }

  //Remove task
  $("#Main-Screen").on("click", "#Task-Cancel", function (e) {
    var task_ = $(this).closest(".task-outer");
    var taskId = task_.attr("id");

    // Send AJAX request to backend at /todo/delete to delete task
    AJAXdeleteTask(taskId);

    delete Dict.tasks[taskId];
    console.log("Cancelled: " + taskId);
    //console.log(Dict.tasks);

    task_.toggleClass("transform transition-all duration-350 delay-75 ease-in-out scale-0 blur-md translate-y-20");

    setTimeout(() => {
      task_.remove();
    }, 400);
  });

  // Complete task
  $("#Main-Screen").on("click", "#Task-Destroyer", function () {
    var task_ = $(this).closest(".task-outer");
    var taskId = task_.attr("id");

    // Disable the checkbox
    $(this).prop("disabled", true);

    console.log("Completed: " + taskId);

    Dict.completed[taskId] = Dict.tasks[taskId];
    delete Dict.tasks[taskId];

    // Also send to backend at /todo/completed/<id>
    AJAXcompleteTask(taskId);

    //console.log(Dict.completed);
    //console.log(Dict.tasks);

    task_.toggleClass(" transform transition-all duration-350 delay-500 ease-in-out scale-150 blur-xl -translate-y-20");
    setTimeout(() => {
      task_.remove();
    }, 800);
  });


  function renderGroupMainScreen(group_html, group, unique_id, mode = 0) {
    // var unique_id = getUuid();
    group_html.append(MainScreen.GroupTemplate(unique_id, group, mode));
    group_html.find("#" + unique_id).find("#Task-Section-Outer").css({ "border-color": group.color });
    return group_html.find("#" + unique_id);
  }

  function LoadMainScreen() {
    console.log("Loading Main Screen");
    // Also add Draggable button again
    $("#Main-Screen").append($(`
    <!-- add question action button here-->
    <div id="add-draggable"  class="z-40 absolute">
        <div  class="touch-none select-none">
            <div id="moveButton" 
                class="hover:w-12 hover:h-12 border-2 border-gray-300 absolute rounded-full w-12 h-12 bg-main/55 dark:bg-gray-700/60 backdrop-blur-sm shadow-xl p-2">
                <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </div>
        </div>
    </div>
    <!-- kết thúc phần nút -->
    `))
    var formatter_html = $("#Main-Screen").append(
      MainScreen.FormatterTemplate()
    );

    // Iterate over groups
    for (var groupId in Dict.groups) {
      if (Dict.groups.hasOwnProperty(groupId)) {
        var group = Dict.groups[groupId];
        var g = renderGroupMainScreen(
          $(formatter_html).find("#Main-Formatter").find("#Wrapper"),
          group,
          groupId,
          currentMode
        );
        //console.log(groupId);
        var task_html = $(g).find("#Task-Section");
        // Iterate over tasks
        for (var taskId in Dict.tasks) {
          if (
            Dict.tasks.hasOwnProperty(taskId) && (
              group.tags.includes(Dict.tasks[taskId].tag) || group.def_tag == Dict.tasks[taskId].tag)
          ) {
            // Pass task details to renderTaskMainScreen
            renderTaskMainScreen(
              task_html,
              Dict.tasks[taskId],
              taskId,
              currentMode
            );
          }
        }
      }
    }
    renderFormatterAddons(formatter_html, currentMode);
  }

  //================================================================\\
  //========================== Initialize ==========================\\
  //================================================================\\

  function RefreshMainScreen() {
    console.log("Refresh the mainscreen");
    $("#Main-Screen").empty();
    // $("#MMenu-Group-Section").empty();
    LoadMainScreen();
    LoadGroups();
    LoadTags();
  }

  function LoadUser() {
    AJAXLoadGroup(); // load data
    LoadGroups_Tag();
    RefreshMainScreen();
  }

  // Take all tags on Dict and put them in the "Select tag" dropdown
  function LoadTags() {
    console.log("Loading tags");

    // console.log(Dict.groups);
    var tagArray = Object.keys(Dict.tags).filter(key => Dict.tags[key].display === true);

    $("#crud-modal select#tags").empty();
    tagArray.forEach(element => {
      let options = `<option value="${element}">${Dict.tags[element].title}</option>`
      $("#crud-modal select#tags").append(options)
    });


    //$("#crud-modal select#tags").append(`<option value="None">None</option>`);

  };
  LoadTags();

  function LoadGroups() {
    console.log("Loading groups");
    var groupArray = Object.keys(Dict.groups);
    $("#crud-modal select#groups").empty();

    groupArray.forEach(element => {
      let options = `<option value="${element}">${Dict.groups[element].title}</option>`
      $("#crud-modal select#groups").append(options)
    });
  };
  LoadGroups();


  function initUser() {
    currentMMenuTab = 0; // 0-today 2-calendar 3-garden
    currentMode = 0;
    LoadUser();
    updateMMenuTabIndicator();
  }
  initUser();


  //================================================================\\
  //========================= CRUD modal ===========================\\
  //================================================================\\
  // Create 

  $('#Main-Screen').on("click", ".Group-Task-Add", function (e) {
    e.preventDefault();
    var gid = $(this).closest(".group-outer").attr("id")
    //console.log(gid);
    //console.log(Dict.groups[gid]);
    var preset_tag = Dict.groups[gid].def_tag;
    // Clean modal first
    // Change modal state
    $("#crud-modal select#tags").append(`<option value="${preset_tag}">${Dict.groups[gid].title}</option>`);

    $('#crud-modal #colors-sec').hide();
    $('#crud-modal label[for="name"]').text("Title");
    $('#crud-modal label[for="description"]').text("Task Description");

    $('#crud-modal h3').text("Create Task");
    $('#crud-modal #name').val("");
    $('#crud-modal #description').val("");
    $('#crud-modal #tags option').removeAttr("selected");
    $('#crud-modal #tags').val(preset_tag);
    $('#crud-modal #todo-expired').val("");
    $('#crud-modal button[type="submit"]').html(`
        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        Create`);
    $('#crud-modal input[type="checkbox"]').attr("id", `task_`);

    // Show modal
    modal.show();
    e.stopPropagation();
  });

  // My work at U in CRUD modal  /// NULL -change the activate condition to prevent conflict with cancel button 
  $('#Main-Screen').on("click", ".Task-Edit", function (e) {

    let id = $(this).closest(".task-outer").attr("id");
    let title = Dict.tasks[id].title;
    let desc = Dict.tasks[id].description;
    let tag = Dict.tasks[id].tag;
    let expired = Dict.tasks[id].deadline;
    console.log(id, desc);
    // Clean up
    // Clean modal first
    $('#crud-modal #colors-sec').hide();
    $('#crud-modal #delete-sec').show();

    $('#crud-modal label[for="name"]').text("Title");
    $('#crud-modal label[for="description"]').text("Task Description");
    // Change task header
    $('#crud-modal h3').text("Edit Task");
    // Change input to task details
    $('#crud-modal #name').val(title);
    $('#crud-modal #description').val(desc);
    $('#crud-modal').find(`#tags option[value="${tag}"]`).attr("selected", title);
    $('#crud-modal #todo-expired').val(expired);
    $('#crud-modal button[type="submit"]').text("Edit");
    // Change honeypot to id
    $('#crud-modal input[type="checkbox"]').attr("id", `task_${id}`);
    // Get current date
    let current_date = new Date();
    // Get date input
    let date_element = $('#crud-modal #todo-expired');
    // Get input date
    let input_date = new Date(date_element.val());
    // If input date is less than current date, show alert
    if (input_date < current_date) {
      date_element.css("border", "2px solid red");
    }
    else {
      date_element.css("border", "2px solid green");
    }
    // Show modal
    modal.show();
    e.stopPropagation();
  })

  // My work at adding limitation on typing Create - Edit modal
  $("#crud-modal").on("input", "#name, #description", function () {
    // Take current input length
    let input_length = $(this).val().length;
    // Take input limitation
    let input_limit = $(this).attr("maxlength");
    // If length > 0, show this length and limitation at the same place in label
    if (input_length > 0) {
      // Update length and limit
      $(this).prev().text(function (e, text) {
        let label_content = text.split(" ");
        // Remove old length and limit (element that starts with "(" and ends with ")")
        label_content = label_content.filter(e => !e.startsWith("(") && !e.endsWith(")"));
        // Join new length and limit
        label_content.push(`(${input_length}/${input_limit})`);
        return label_content.join(" ");
      })
    }
    else {
      // Update length and limit
      $(this).prev().text(function (e, text) {
        let label_content = text.split(" ");
        // Remove old length and limit (element that starts with "(" and ends with ")")
        label_content = label_content.filter(e => !e.startsWith("(") && !e.endsWith(")"));
        // Join just title
        return label_content.join(" ");
      })
    }
  })
  // And also checking for expired date
  $("#crud-modal").on("input", "#todo-expired", function () {
    // Get current date
    let current_date = new Date();
    // Get input date
    let input_date = new Date($(this).val());
    // If input date is less than current date, show alert
    if (input_date < current_date) {
      $(this).css("border", "2px solid red");
    }
    else {
      $(this).css("border", "2px solid green");
    }
  })

  // Submit button
  $('#crud-modal form').on("submit", function (e) {
    e.preventDefault();
    console.log($('#crud-modal h3').text())
    // Get id from honeypot, if id is empty string, it means it's a new task
    let id = $('#crud-modal input[type="checkbox"]').attr("id").split("_")[1];
    let generateId = getUuid();
    // Get all input
    let mode = $('#crud-modal input[type="checkbox"]').attr("id").split("_")[0];
    let title = $('#crud-modal #name').val();
    let desc = $('#crud-modal #description').val();
    let tag = $('#crud-modal #tags').val();
    let group = $('#crud-modal #groups').val();
    let expired = $('#crud-modal #todo-expired').val();
    let color = $('#crud-modal #colors').val();
    console.log(mode, id, title, desc, tag, expired, color);
    // Before updatind Dict, check if tag is empty
    if (modal.isVisible()) {

      if (id == "") {
        // Adding a new task to the tasks object within Dict
        Dict.tasks[generateId] = {
          title: title,
          description: desc,
          tag: tag,
          //  group: group,

          deadline: expired,
          points: 4,
        };


        // Call AJAX at /todo/create with JSON data
        AJAXcreateTask(generateId, title, desc, tag, expired, 4);
      }
      else {
        // Update Dict
        Dict.tasks[id].title = title;
        Dict.tasks[id].description = desc;
        Dict.tasks[id].tag = tag;
        Dict.tasks[id].deadline = expired;
        // Call AJAX at /todo/update with JSON data
        AJAXupdateTask(id, title, desc, tag, expired, 4);
      }
    }
    if (addGroupnTagModal.isVisible()) {

      let action = "";
      if (isMakeChangeGroup == true) {
        if (id == "") {  /// Create a new group

          ///deftag dict
          var def_tag_id = getUuid();
          var def_tag = Dict.tags[def_tag_id] = {
            title: title,
            color: randHexColor(),
            groupId: generateId,
            deleteable: false,
            editable: false,
            display: false,
          };

          /// group dict
          var g = Dict.groups[generateId] = {
            title: title,
            tags: [],
            def_tag: def_tag_id,
            color: color,
            current_html: "",
          };



          $("#MMenu-Group-Section").append(MainMenu.GroupTemplates(generateId, g));
          /// Main Screen Add 
          renderGroupMainScreen($("#Main-Formatter").find("#Wrapper"), g, currentMode);
          AJAXaddGroup(generateId, title, color);
        }
        else { // Edit groups
          Dict.groups[id].title = title;
          Dict.groups[id].color = color;
          $("#MMenu-Group-Section").find("#" + id).find("#MMenu-Group-Title").text(title);
          generateId = id; // Keep the same id
          AJAXupdateGroup(id, title, color);
        }

      }
      else if (isMakeChangeGroup == false) {
        if (id == "") {  /// Create a new tags
          var t = Dict.tags[generateId] = {
            title: title,
            color: randHexColor(),

            groupId: group,
            deleteable: true,
            editable: true,
            display: true,

          };
          Dict.groups[group].tags.push(generateId);
          addNewTagMainMenu($("#" + group).find("#MMenu-Tag-Section"), generateId, t);
          AJAXaddTag(generateId, group, title, t.color);
        }
        else { //Edit tags
          Dict.tags[id].title = title;
          Dict.tags[id].color = color;
          $("#MMenu-Group-Section").find("#" + id).find("#MMenu-Tag-Title").text(title);
          generateId = id; // Keep the same id
          AJAXupdateTag(id, group, title, color);
        }

      }

    }
    console.log(Dict);
    alert("Submitted");
    RefreshMainScreen();
    closeModal();
    //resetModalState();
    // window.location = window.location;
  })

  //Delete button
  $('#crud-modal #delete-sec').on("click", function (e) {
    e.preventDefault();

    // Get id from honeypot, if id is empty string, it means it's a new task
    let id = $('#crud-modal input[type="checkbox"]').attr("id").split("_")[1];
    // Get all input
    let group = $('#crud-modal #groups').val();
    // Before updatind Dict, check if tag is empty
    if (modal.isVisible()) {
      if (id != "") {
        // Deleting task
        delete Dict.tasks[id];
        var task_ = $('#' + id);
        task_.remove();
        // Call AJAX at /todo/delete with JSON data
        AJAXdeleteTask(id);
      }
    }
    if (addGroupnTagModal.isVisible()) {
      if (isMakeChangeGroup == true) {
        if (id != "") {  /// Delete a new group


          delete Dict.tags[Dict.groups[id].def_tag]; // Delete def tag
          delete Dict.groups[id]; // Delete group

          var group_ = $('#' + id);
          group_.remove();
          AJAXdeleteGroup(id);
        }
      }

      else if (isMakeChangeGroup == false) {   ///  Delete a tag
        if (id != "") {
          var groupWithAccordingTag;
          Dict.groups = Object.fromEntries(
            Object.entries(Dict.groups).map(([key, value]) => {
              if (value.tags.includes(id)) {
                //delete Dict.tasks[key];
                value.tags = value.tags.filter(e => e !== id);
                groupWithAccordingTag = key;
              }
              return [key, value];
            })
          );
          delete Dict.tags[id];

          Dict.tasks = Object.fromEntries(
            Object.entries(Dict.tasks).map(([key, value]) => {
              if (value.tag == id) {
                value.tag = Dict.groups[groupWithAccordingTag].def_tag;
              }
              return [key, value];
            })
          );


          var tag_ = $('#' + id);
          tag_.remove();
          AJAXdeleteTag(id);
        }
      }

    }
    alert("Deleted: " + id);
    RefreshMainScreen();
    closeModal();
  })
  // When user clicked at list item, it will add tag to the task and also close dropdown
  function closeModal() {
    console.log(Dict);
    modal.hide();
    addGroupnTagModal.hide();
    LoadTags();
  };
  // Close modal manually
  $('#btn-close-modal').click(function () {
    closeModal();
  });

  closeModal();
  //modal.show();

  //addGroupnTagModal.show()

})
//Function to render image of user profile
function AJAXgetUserProfileImage() {
  $.ajax({
    type: "GET",
    url: "/profile/get/image",
    success: function (data) {
      $("#Avatar-Image").attr("src", data);
    },
    error: function (data) {
      console.log("Error");
    }
  });
}
AJAXgetUserProfileImage();
// End of app.js