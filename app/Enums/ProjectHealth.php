<?php

namespace App\Enums;

enum ProjectHealth: string
{
    case ALERT = 'ALERT';
    case REGULAR = 'REGULAR';
}

