#!/bin/bash

REV=`git rev-parse --short HEAD`
mv kaushyr-tui-calendar-panel kaushyr-tui-calendar-panel-$REV
zip -r kaushyr-tui-calendar-panel-$REV kaushyr-tui-calendar-panel-$REV
