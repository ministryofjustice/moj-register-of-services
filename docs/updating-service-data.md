# Updating the register of services data

## Managing the website's data

Data for the register of services is collated in a [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1QBinP_NZydzNLs7QSPzosWXsq-A5z4XWJCTq8c2O5z8/edit) shared with the Design Operations team.

The spreadsheet is divided into different areas corresponding to organisations within the MoJ:

- HM Courts & Tribunal Service (HMCTS)
- HM Prison & Probation Service (HMPPS)
- Legal Aid Agency (LAA)
- Office for the Public Guardian (OPG)
- Criminal Injuries Compensation Authority (CICA)
- Official Solicitor and Public Trustee (OSPT)
- Youth Justice Board (YJB)
- Ministry of Justice (HQ)
- Other (a catch-all)

These sheets are used to manage the data.

Each separate sheet is copied automatically into one sheet called "ALLDATA". It is from this sheet that the JSON file should be created and exported.

## Exporting the spreadsheet data

The spreadsheet headers are configured in a way that will automatically format the exported JSON package correctly.

We use a Google Sheet add-on called [Export Sheet Data](https://chrome.google.com/webstore/detail/export-sheet-data/bfdcopkbamihhchdnjghdknibmcnfplk?utm_source=permalink) to generated the JSON. Documentation for the Export Sheet Data add-on can be viewed on [GitHub](https://github.com/Synthoid/ExportSheetData/blob/master/docs/index.md).

The add-on is run via the menu and associated sidebar.

When the sidebar is open the following options should be configured, if not already:

- **Format**

  Selected format: JSON
  Selected sheet: Current sheet only

- **General**

  Ignore empty cells ✔️

- **Advanced**

  Nested elements ✔️

Everything else should be left as the default.

You're now ready to export the data.

### Clicking export

The export may take a little time to complete, but when done it will write a file to your local Google Drive called something like `MoJ – Register of Services - ALLDATA.json`.

## Importing the data into the website

Once you have found the data file in Google Drive, rename it to `services.json` and copy it to the `app > data` folder in the `moj-register-of-services` project.

On your local version of the website, refresh the site and you should be see the changes updated.

## Commit the changes to GitHub

Commit the data to GitHub. In a few seconds, the changes will be deployed to the [staging website](https://moj-register-services-staging.herokuapp.com/). You will need to manually deploy to the live website via the [Heroku dashboard](https://dashboard.heroku.com/apps/moj-register-of-services).