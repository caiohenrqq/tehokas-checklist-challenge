<?php

namespace App\Enums;

enum TaskPriority: int
{
    case NO_PRIORITY = 0;
    case LOW = 1;
    case MEDIUM = 2;
    case HIGH = 3;
    case CRITICAL = 4;
}
