var app = angular.module("myApp", []);
app.filter("to_trusted", [
  "$sce",
  function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  },
]);

app.controller("myCtrl", function ($scope) {
  $scope.inroPage = true;
  $scope.initType = "a";

  $scope.insContent = [
    "Deduce how many blocks are in a bag by adding and subtracting blocks and bags while keeping the balance scale equal.",
    "Clicking on the red and green buttons above will allow you to add and subtract blocks and bags.",
    "For each step along the way, record what you do and what is left on each side of the balance scale.",
  ];

  $scope.hintLabelArre = ["Open Hint", "Close Hint"];
  $scope.hintMsgArre = [
    "Hint #1:<br> If all you have left is blocks, this won’t help. Add bags.",
    "Hint #2:<br> If all you have left is bags, this won’t help. Add blocks.",
    "Hint #3:<br> The problem is not solved until you have one side with one bag and one side  with only blocks.",
  ];

  // hint variables function
  $scope.intiAndResetHintFunc = function () {
    $scope.hintLabelNumber = 0;
    $scope.showMsgItem = 0;
    $scope.showHintMsg = false;
    $scope.showFirstTimeHint = true;

    $scope.hintLabel = $scope.hintLabelArre[$scope.hintLabelNumber];
  };

  // initial data setup and variables
  $scope.initShowDataObj = {
    a: {
      leftSideWeight: {
        bags: 0,
        cubes: 0,
      },
      rightSideWeight: {
        bags: 0,
        cubes: 0,
      },
    },
    b: {
      leftSideWeight: {
        bags: 2,
        cubes: 7,
      },
      rightSideWeight: {
        bags: 1,
        cubes: 10,
      },
    },
    c: {
      leftSideWeight: {
        bags: 3,
        cubes: 6,
      },
      rightSideWeight: {
        bags: 4,
        cubes: 1,
      },
    },
  };

  $scope.initDataValue = function () {
    $scope.leftSideCubes =
      $scope.initShowDataObj[$scope.initType].leftSideWeight.cubes;
    $scope.leftSideBags =
      $scope.initShowDataObj[$scope.initType].leftSideWeight.bags;
    $scope.rightSideCubes =
      $scope.initShowDataObj[$scope.initType].rightSideWeight.cubes;
    $scope.rightSideBags =
      $scope.initShowDataObj[$scope.initType].rightSideWeight.bags;

    $scope.leftSideMoreValue = false;
    $scope.rightSideMoreValue = false;

    $scope.showMsgText = "";
  };

  $scope.incDecCubeBagFunc = function (side, element, action) {
    // left side button controls
    if (side === "left" && element === "cube" && action === "-") {
      $scope.leftSideCubes = $scope.leftSideCubes - 1;
    }
    if (side === "left" && element === "cube" && action === "+") {
      $scope.leftSideCubes = $scope.leftSideCubes + 1;
    }
    if (side === "left" && element === "bag" && action === "-") {
      $scope.leftSideBags = $scope.leftSideBags - 1;
    }
    if (side === "left" && element === "bag" && action === "+") {
      $scope.leftSideBags = $scope.leftSideBags + 1;
    }

    // right side button controls
    if (side === "right" && element === "cube" && action === "-") {
      $scope.rightSideCubes = $scope.rightSideCubes - 1;
    }
    if (side === "right" && element === "cube" && action === "+") {
      $scope.rightSideCubes = $scope.rightSideCubes + 1;
    }
    if (side === "right" && element === "bag" && action === "-") {
      $scope.rightSideBags = $scope.rightSideBags - 1;
    }
    if (side === "right" && element === "bag" && action === "+") {
      $scope.rightSideBags = $scope.rightSideBags + 1;
    }
    $scope.calculationFunc();
  };

  $scope.calculationFunc = function () {
    $scope.showMsgText = "";
    $scope.leftSideMoreValue = false;
    $scope.rightSideMoreValue = false;
    var bagValue = 0;
    if ($scope.initType === "a") {
      bagValue = 6;
    } else if ($scope.initType === "b") {
      bagValue = 3;
    } else {
      bagValue = 5;
    }
    var leftTotal = $scope.leftSideCubes + bagValue * $scope.leftSideBags;
    var rightTotal = $scope.rightSideCubes + bagValue * $scope.rightSideBags;
    if (leftTotal > rightTotal) {
      $scope.leftSideMoreValue = true;
      $scope.showMsgText = "";
    } else if (leftTotal < rightTotal) {
      $scope.rightSideMoreValue = true;
      $scope.showMsgText = "";
    } else {
      if ($scope.rightSideBags === 0 && $scope.leftSideBags === 1) {
        $scope.showMsgText =
          '<h2 class="right-side-block">' +
          $scope.leftSideBags +
          " bag <span>=</span> " +
          $scope.rightSideCubes +
          " blocks</h2>";
      } else if ($scope.leftSideBags === 0 && $scope.rightSideBags === 1) {
        $scope.showMsgText =
          '<h2 class="left-side-block">' +
          $scope.leftSideCubes +
          " blocks <span>=</span> " +
          $scope.rightSideBags +
          " bag</h2>";
      }
    }
    console.log(leftTotal, rightTotal);
  };

  // hint label function and change massege
  $scope.showHintLabelFunc = function () {
    $scope.hintLabelNumber++;
    if ($scope.hintLabelNumber > 1) {
      $scope.hintLabelNumber = 0;
    }
    $scope.hintLabel = $scope.hintLabelArre[$scope.hintLabelNumber];
    $scope.showHintMsg = !$scope.showHintMsg;

    if (!$scope.showFirstTimeHint) {
      if ($scope.showHintMsg) {
        $scope.showMsgItem++;
        if ($scope.showMsgItem > 2) {
          $scope.showMsgItem = 0;
        }
      }
    }
    $scope.showFirstTimeHint = false;
  };

  // Reset
  $scope.resetType = function () {
    $scope.initDataValue();
    $scope.intiAndResetHintFunc();
  };

  // select Type function
  $scope.selectType = function (type) {
    $scope.initType = type;
    $scope.initDataValue();
  };

  // Toggle Screens
  $scope.toggleView = function () {
    // reset value for hints
    $scope.intiAndResetHintFunc();

    // reset value inti data
    $scope.initDataValue();
    $scope.introPage = !$scope.introPage;
  };

  // Toggle Instructions
  $scope.toggleIns = function (key) {
    var target = $("#instruction");
    switch (key) {
      case 1:
        target.animate(
          {
            top: "987px",
          },
          500,
          function () {}
        );
        break;
      case 2:
        target.animate(
          {
            top: "-94px",
          },
          500,
          function () {}
        );
        break;
      default:
        break;
    }
  };
});
